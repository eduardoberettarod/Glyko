import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors } from '@/theme/colors'
import { styles } from './style'

//components
import Scroll from '@/components/Scroll';
import Header from '@/components/Header'
import HeaderSection from '@/components/HeaderSection';
import MetricsPanel from '@/components/MetricsPanel';
import Alert from '@/components/Alert';
import PieChart from '@/components/PieChart';
import { GlucoseMeasurement } from '@/components/PieChart';

import { useAuth } from '@/contexts/AuthContext';
import { buscarMetricasDoDia, listarMedicoes } from '@/database/glucose_measurements';

const UMA_HORA_EM_MS = 60 * 60 * 1000;
const VINTE_QUATRO_HORAS_EM_MS = 24 * UMA_HORA_EM_MS;

// Converte a classificação salva no banco (low/normal/high) para o
// formato usado internamente pelo PieChart (baixa/normal/alta).
function classificacaoParaStatusDoPieChart(
  classification: string
): GlucoseMeasurement['status'] {
  if (classification === 'low') return 'baixa';
  if (classification === 'high') return 'alta';
  return 'normal';
}

function saudacaoPeloHorario() {
  const hora = new Date().getHours();

  if (hora < 12) return 'Bom dia';
  if (hora < 18) return 'Boa tarde';
  return 'Boa noite';
}

interface Metricas {
  average: number | null;
  highest: number | null;
  lowest: number | null;
  latest: number | null;
}

export default function Index() {

  const insets = useSafeAreaInsets()
  const { user } = useAuth();

  const [metricas, setMetricas] = useState<Metricas>({
    average: null,
    highest: null,
    lowest: null,
    latest: null,
  });
  const [measurements, setMeasurements] = useState<GlucoseMeasurement[]>([]);

  const carregarDados = useCallback(async () => {
    if (!user) {
      return;
    }

    const [metricasDoDia, todasAsMedicoes] = await Promise.all([
      buscarMetricasDoDia(user.id),
      listarMedicoes(user.id),
    ]);

    setMetricas(metricasDoDia);

    const agora = Date.now();
    const medicoesDasUltimas24h = todasAsMedicoes.filter((medicao) => {
      const medidoEm = new Date(medicao.measured_at).getTime();
      return agora - medidoEm <= VINTE_QUATRO_HORAS_EM_MS;
    });

    setMeasurements(
      medicoesDasUltimas24h.map((medicao) => ({
        status: classificacaoParaStatusDoPieChart(medicao.classification),
      }))
    );
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados])
  );

  return (
    <Scroll style={styles.container}>
      <View style={styles.header}>
        <HeaderSection
          title={`${saudacaoPeloHorario()}${user ? `, ${user.first_name}` : ''}`}
          subtitle={'Visão Geral'}
        />
      </View>

      <View style={styles.chart}>
        <View style={styles.textChartContainer}>
          <Text style={styles.label}>Hoje</Text>
          <Text style={styles.label}>Últimas 24h</Text>
        </View>
        <PieChart measurements={measurements} />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelText}>Painel de Métricas</Text>
        <MetricsPanel
          average={metricas.average}
          highest={metricas.highest}
          lowest={metricas.lowest}
          latest={metricas.latest}
        />
      </View>

      <Alert
        icon={'history'}
        title={'Revisar Histórico'}
        text={'Verifique as medições dos últimos 30 dias'}
      />

    </Scroll>
  )
}