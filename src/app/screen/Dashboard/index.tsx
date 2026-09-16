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

// Mesmo critério de "dia" usado por buscarMetricasDoDia no banco
// (date(measured_at) = date('now')): o SQLite compara em UTC, então
// usamos getUTC* aqui para o gráfico bater exatamente com o painel.
function mesmoDiaDoBanco(dataISO: string) {
  const medido = new Date(dataISO);
  const agora = new Date();

  return (
    medido.getUTCFullYear() === agora.getUTCFullYear() &&
    medido.getUTCMonth() === agora.getUTCMonth() &&
    medido.getUTCDate() === agora.getUTCDate()
  );
}

// Converte a classificação salva no banco (low/normal/high) para o
// formato usado internamente pelo PieChart (baixa/normal/alta).
function classificacaoParaStatusDoPieChart(
  classification: string
): GlucoseMeasurement['status'] {
  if (classification === 'low') return 'baixa';
  if (classification === 'high') return 'alta';
  return 'normal';
}

// Devolve a saudação adequada ("Bom dia", "Boa tarde" ou "Boa noite") conforme a hora atual do dispositivo.
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

// Tela principal do app, com a saudação, as métricas do dia e o gráfico de distribuição das medições das últimas 24 horas.
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
  const [saudacao, setSaudacao] = useState('');
  // Busca as métricas do dia e as medições do usuário, filtrando as últimas 24h para alimentar o gráfico de pizza.
  const carregarDados = useCallback(async () => {
    if (!user) {
      return;
    }

    const [metricasDoDia, todasAsMedicoes] = await Promise.all([
      buscarMetricasDoDia(user.id),
      listarMedicoes(user.id),
    ]);

    setMetricas(metricasDoDia);

    const medicoesDeHoje = todasAsMedicoes.filter((medicao) =>
      mesmoDiaDoBanco(medicao.measured_at)
    );

    setMeasurements(
      medicoesDeHoje.map((medicao) => ({
        status: classificacaoParaStatusDoPieChart(medicao.classification),
      }))
    );
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados])
  );

  useEffect(() => {
    const atualizarSaudacao = () => setSaudacao(saudacaoPeloHorario());
    atualizarSaudacao();

    const intervalo = setInterval(atualizarSaudacao, 60000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <Scroll style={styles.container}>
      <View style={styles.header}>
        <HeaderSection
          title={`${saudacao}${user ? `, ${user.first_name}` : ''}`}
          subtitle={'Visão Geral'}
        />
      </View>

      <View style={styles.chart}>
        <View style={styles.textChartContainer}>
          <Text style={styles.label}>Hoje</Text>
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
        title={'Lembrete'}
        text={'Verifique as medições dos últimos 30 dias'}
      />

    </Scroll>
  )
}