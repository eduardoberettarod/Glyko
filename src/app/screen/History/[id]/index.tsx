import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from './style';
import { colors } from '@/theme/colors';

import BackButton from '@/components/BackButton';
import Separator from '@/components/Separator';
import Scroll from '@/components/Scroll';
import { Icon } from '@/utils/icon';
import { MOODS } from '@/components/MoodSelector';

import { useAuth } from '@/contexts/AuthContext';
import { buscarMedicaoPorId, excluirMedicao, Medicao } from '@/database/glucose_measurements';
import { listarHumores, Humor } from '@/database/moods';

type Level = 'low' | 'normal' | 'high';

// Mesmos rótulos usados na tela de Nova Medição.
const LABEL_DO_CONTEXTO: Record<string, string> = {
  fasting: 'Jejum',
  before_meal: 'Antes da refeição',
  after_meal: 'Depois da refeição',
  snack: 'Lanche',
  before_bed: 'Antes de dormir',
  after_exercise: 'Após atividade física',
};

type NivelInfo = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  style: object;
};

const INFO_DO_NIVEL: Record<Level, NivelInfo> = {
  normal: { label: 'Normal', icon: 'trending-neutral', style: styles.normal },
  high: { label: 'Alto', icon: 'trending-up', style: styles.high },
  low: { label: 'Baixo', icon: 'trending-down', style: styles.low },
};

const DIAS_DA_SEMANA = [
  'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
  'Quinta-feira', 'Sexta-feira', 'Sábado',
];
const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

function dataFormatada(dataISO: string) {
  const data = new Date(dataISO);
  return `${DIAS_DA_SEMANA[data.getDay()]}, ${data.getDate()} de ${MESES[data.getMonth()]}`;
}

function horaFormatada(dataISO: string) {
  const data = new Date(dataISO);
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function DetalheDaMedicao() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();

  const [medicao, setMedicao] = useState<Medicao | null>(null);
  const [humor, setHumor] = useState<Humor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const carregarMedicao = useCallback(async () => {
    if (!user || !id) {
      return;
    }

    setIsLoading(true);

    try {
      const [medicaoEncontrada, humores] = await Promise.all([
        buscarMedicaoPorId(Number(id), user.id),
        listarHumores(),
      ]);

      setMedicao(medicaoEncontrada);
      setHumor(humores.find((h) => h.id === medicaoEncontrada.mood_id) ?? null);
    } catch (error) {
      Alert.alert('Não foi possível carregar', 'Tente novamente em instantes.');
      router.back();
    } finally {
      setIsLoading(false);
    }
  }, [user, id]);

  useFocusEffect(
    useCallback(() => {
      carregarMedicao();
    }, [carregarMedicao])
  );

  function confirmarExclusao() {
    Alert.alert(
      'Excluir registro?',
      'Essa medição será apagada permanentemente. Essa ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: handleExcluir },
      ]
    );
  }

  async function handleExcluir() {
    if (!user || !medicao) {
      return;
    }

    try {
      await excluirMedicao(medicao.id, user.id);
      router.back();
    } catch (error) {
      Alert.alert('Não foi possível excluir', 'Tente novamente em instantes.');
    }
  }

  function handleEditar() {
    if (!medicao) {
      return;
    }

    // A tela de Registro ainda precisa aprender a rodar em "modo edição"
    // (receber esse id, pré-preencher os campos e chamar atualizarMedicao).
    router.push({
      pathname: '/screen/Register',
      params: { id: String(medicao.id) },
    });
  }

  if (isLoading || !medicao) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.emerald[500]} />
      </View>
    );
  }

  const nivel = INFO_DO_NIVEL[medicao.classification as Level] ?? INFO_DO_NIVEL.normal;
  const moodInfo = humor
    ? MOODS.find((m) => m.id === humor.name.toLowerCase())
    : null;

  return (
    <View style={{ flex: 1 }}>
      <Scroll style={styles.container}>

        <View style={styles.topBar}>
          <BackButton onPress={() => router.back()} />

          <TouchableOpacity
            style={styles.deleteButton}
            activeOpacity={0.8}
            onPress={confirmarExclusao}
          >
            <BlurView style={styles.deleteBlur} tint="dark" intensity={80}>
              <Feather name="trash" size={18} color={colors.red[500]} />
            </BlurView>
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <View style={[styles.heroIcon, nivel.style]}>
            <MaterialCommunityIcons name={nivel.icon} size={28} color={colors.black} />
          </View>

          <View style={styles.heroValueRow}>
            <Text style={styles.heroValue}>{medicao.glucose_level}</Text>
            <Text style={styles.heroUnit}>mg/dL</Text>
          </View>

          <Text style={styles.heroLevel}>{nivel.label}</Text>
        </View>

        <View style={styles.panel}>

          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="calendar-outline" size={18} color={colors.gray[400]} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>Dia</Text>
              <Text style={styles.rowValue}>{dataFormatada(medicao.measured_at)}</Text>
            </View>
          </View>

          <Separator color={colors.gray[700]} />

          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="time-outline" size={18} color={colors.gray[400]} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>Horário</Text>
              <Text style={styles.rowValue}>{horaFormatada(medicao.measured_at)}</Text>
            </View>
          </View>

          <Separator color={colors.gray[700]} />

          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <MaterialCommunityIcons name="clipboard-text-outline" size={18} color={colors.gray[400]} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>Contexto da medição</Text>
              <Text style={styles.rowValue}>
                {LABEL_DO_CONTEXTO[medicao.measurement_context] ?? medicao.measurement_context}
              </Text>
            </View>
          </View>

          <Separator color={colors.gray[700]} />

          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <MaterialCommunityIcons
                name={(moodInfo?.iconName as any) ?? 'emoticon-outline'}
                size={18}
                color={colors.gray[400]}
              />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>Humor</Text>
              <Text style={styles.rowValue}>{moodInfo?.label ?? 'Não informado'}</Text>
            </View>
          </View>

        </View>

        {!!medicao.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesLabel}>Observação</Text>
            <View style={styles.notesBox}>
              <Text style={styles.notesText}>{medicao.notes}</Text>
            </View>
          </View>
        )}

      </Scroll>

      <TouchableOpacity
        style={styles.editButton}
        activeOpacity={0.8}
        onPress={handleEditar}
      >
        <Icon name="edit" size={20} />
      </TouchableOpacity>
    </View>
  );
}