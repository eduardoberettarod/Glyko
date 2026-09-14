import { View, Text, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { styles } from './style';
import { colors } from '@/theme/colors';

//components
import { MoodSelector, MoodId } from '@/components/MoodSelector';
// import Scroll from '@/components/Scroll';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Dropdown from '@/components/Dropdown';
import { styles as dropdownStyles } from '@/components/Dropdown/style';
import { DateTimeInput } from '@/components/DateTimeInput';
import { NumericInput } from '@/components/NumericInput';
import ReturnPage from '@/components/ReturnPage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/contexts/AuthContext';
import { atualizarMedicao, buscarMedicaoPorId, criarMedicao } from '@/database/glucose_measurements';
import { listarHumores } from '@/database/moods';
import { sincronizarLembretesDeMedicao } from '@/services/notifications';

export default function Register() {

  const router = useRouter();
  const insets = useSafeAreaInsets()
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = !!id;
  const MARGIN_TOP = 30
  const MARGIN_BOTTOM = 40
  type MeasurementContext =
    | 'fasting'
    | 'before_meal'
    | 'after_meal'
    | 'snack'
    | 'before_bed'
    | 'after_exercise';

  const [measurementContext, setMeasurementContext] = useState<MeasurementContext>('fasting');
  const [measurementDate, setMeasurementDate] = useState<Date>(new Date());
  const [measurementTime, setMeasurementTime] = useState<Date>(new Date());
  const [glicemia, setGlicemia] = useState('');
  const [mood, setMood] = useState<MoodId>('happy');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Só entra em loading quando existe um id: é o tempo que leva pra
  // buscar a medição existente e pré-preencher os campos abaixo.
  const [isLoadingMedicao, setIsLoadingMedicao] = useState(isEditing);

  // Modo edição: busca a medição clicada no Histórico e usa seus
  // dados para preencher o formulário (em vez de começar em branco).
  useEffect(() => {
    if (!isEditing || !user || !id) {
      return;
    }

    let telaAtiva = true;

    async function carregarMedicaoParaEdicao() {
      try {
        const [medicaoEncontrada, humores] = await Promise.all([
          buscarMedicaoPorId(Number(id), user!.id),
          listarHumores(),
        ]);

        if (!telaAtiva) {
          return;
        }

        setGlicemia(String(medicaoEncontrada.glucose_level));
        setMeasurementContext(medicaoEncontrada.measurement_context as MeasurementContext);

        const dataDaMedicao = new Date(medicaoEncontrada.measured_at);
        setMeasurementDate(dataDaMedicao);
        setMeasurementTime(dataDaMedicao);
        setNotes(medicaoEncontrada.notes ?? '');

        const humorDaMedicao = humores.find((humor) => humor.id === medicaoEncontrada.mood_id);
        if (humorDaMedicao) {
          setMood(humorDaMedicao.name.toLowerCase() as MoodId);
        }
      } catch (error) {
        Alert.alert('Não foi possível carregar', 'Tente novamente em instantes.');
        router.back();
      } finally {
        if (telaAtiva) {
          setIsLoadingMedicao(false);
        }
      }
    }

    carregarMedicaoParaEdicao();

    return () => {
      telaAtiva = false;
    };
  }, [isEditing, id, user]);

  const measurementContexts: { label: string; value: MeasurementContext }[] = [
    {
      label: 'Jejum',
      value: 'fasting',
    },
    {
      label: 'Antes da refeição',
      value: 'before_meal',
    },
    {
      label: 'Depois da refeição',
      value: 'after_meal',
    },
    {
      label: 'Lanche',
      value: 'snack',
    },
    {
      label: 'Antes de dormir',
      value: 'before_bed',
    },
    {
      label: 'Após atividade física',
      value: 'after_exercise',
    },
  ];

  const handlePeriodChange = (value: MeasurementContext | null) => {
    if (value) {
      setMeasurementContext(value);
    }
  };

  // Junta a data escolhida com o horário escolhido em um único instante.
  function combinarDataEHorario(data: Date, horario: Date) {
    const resultado = new Date(data);
    resultado.setHours(horario.getHours(), horario.getMinutes(), 0, 0);
    return resultado;
  }

  async function buscarIdDoHumorSelecionado(): Promise<number | null> {
    try {
      const humores = await listarHumores();
      const humorEncontrado = humores.find(
        (humor) => humor.name.toLowerCase() === mood.toLowerCase()
      );
      return humorEncontrado?.id ?? null;
    } catch (error) {
      // Se não for possível buscar o humor, a medição ainda é salva sem ele.
      return null;
    }
  }

  async function handleSalvar() {
    if (!user || isSubmitting) {
      return;
    }

    const glucoseLevel = Number(glicemia);

    if (!glicemia || Number.isNaN(glucoseLevel)) {
      Alert.alert('Informe a glicemia', 'Digite um valor de glicemia válido.');
      return;
    }

    setIsSubmitting(true);

    try {
      const moodId = await buscarIdDoHumorSelecionado();

      const dadosDaMedicao = {
        glucose_level: glucoseLevel,
        measurement_context: measurementContext,
        measured_at: combinarDataEHorario(measurementDate, measurementTime).toISOString(),
        mood_id: moodId,
        notes: notes.trim().length > 0 ? notes.trim() : null,
      };

      if (isEditing && id) {
        await atualizarMedicao(Number(id), user.id, dadosDaMedicao);
      } else {
        await criarMedicao({ user_id: user.id, ...dadosDaMedicao });
      }

      // A medição recém-salva (ou editada) pode "cobrir" o lembrete mais
      // próximo (ex: medir às 11h30 cancela o lembrete das 12h).
      if (user.notifications_enabled) {
        sincronizarLembretesDeMedicao(user.id);
      }

      router.back();
    } catch (error) {
      Alert.alert('Não foi possível salvar', 'Tente novamente em instantes.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoadingMedicao) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.emerald[500]} />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: insets.top + MARGIN_TOP,
          paddingBottom: insets.bottom + MARGIN_BOTTOM
        }
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bottomOffset={30}
    >

      <View>
        <ReturnPage
          title={isEditing ? 'Editar Medição' : 'Nova Medição'}
          subtitle={
            isEditing
              ? 'Altere os dados desta medição registrada'
              : 'Registre uma nova medição de glicemia'
          }
        />
      </View>

      <View style={styles.NumericInput}>
        <NumericInput
          label="Glicemia (mg/dL)"
          value={glicemia}
          onChange={setGlicemia}
          placeholder="0"
        />
      </View>

      <View style={styles.DateTimeInput}>
        <DateTimeInput
          mode="date"
          label="Data da Medição"
          value={measurementDate}
          onChange={setMeasurementDate}
          maximumDate={new Date()}
        />

        <DateTimeInput
          mode="time"
          label="Horário da medição"
          value={measurementTime}
          onChange={setMeasurementTime}
        />
      </View>

      <View style={styles.contextMedication}>
        <Text style={styles.label}>Contexto da medição</Text>
        <Dropdown
          value={measurementContext}
          onChange={handlePeriodChange}
          items={measurementContexts}
          placeholder="Período"
          style={dropdownStyles.dropdown}
          textStyle={dropdownStyles.dropdownText}
          dropDownContainerStyle={dropdownStyles.dropdownContainer}
        />
      </View>

      <View style={styles.moodSelector}>
        <Text style={styles.label}>Como se sente?</Text>
        <MoodSelector value={mood} onChange={setMood} />
      </View>

      <View style={styles.observation}>
        <Input
          label={'Observação'}
          isTextarea={true}
          placeholder={'Adicione notas sobre a refeição, atividade física ou medicação...'}
          placeholderTextColor={colors.gray[700]}
          value={notes}
          onChangeText={setNotes}
        />
      </View>

      <View style={styles.footer}>
        <Button
          title={
            isSubmitting
              ? 'Salvando...'
              : isEditing
                ? 'Salvar Alterações'
                : 'Salvar Registro'
          }
          borderColor={colors.gray[700]}
          colorText={colors.emerald[500]}
          color={colors.onyx}
          disabled={isSubmitting}
          onPress={handleSalvar}
        />
      </View>

    </KeyboardAwareScrollView>
  )
}
