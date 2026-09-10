import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
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
import { criarMedicao } from '@/database/glucose_measurements';
import { listarHumores } from '@/database/moods';

export default function Register() {

  const router = useRouter();
  const insets = useSafeAreaInsets()
  const { user } = useAuth();
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

      await criarMedicao({
        user_id: user.id,
        glucose_level: glucoseLevel,
        measurement_context: measurementContext,
        measured_at: combinarDataEHorario(measurementDate, measurementTime).toISOString(),
        mood_id: moodId,
        notes: notes.trim().length > 0 ? notes.trim() : null,
      });

      router.back();
    } catch (error) {
      Alert.alert('Não foi possível salvar', 'Tente novamente em instantes.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: insets.top + MARGIN_TOP,
          paddingBottom: insets.bottom + MARGIN_BOTTOM
        }
      ]}
    >

      <View>
        <ReturnPage
          title={'Nova Medição'}
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
          title={isSubmitting ? 'Salvando...' : 'Salvar Registro'}
          borderColor={colors.gray[700]}
          colorText={colors.emerald[500]}
          color={colors.onyx}
          disabled={isSubmitting}
          onPress={handleSalvar}
        />
      </View>

    </ScrollView>
  )
}
