import React, { useCallback, useState } from 'react';

import { View, Text } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';

import { styles } from './style';

// components

import HeaderSection from '@/components/HeaderSection';
import Filter from '@/components/Filter';
import Card from '@/components/Card';
import Scroll from '@/components/Scroll';
import LineChart from '@/components/LIneChart';
import Dropdown from '@/components/Dropdown';
import SelectionBar from '@/components/SelectionBar';

import { styles as dropdownStyles } from '@/components/Dropdown/style';

import { useAuth } from '@/contexts/AuthContext';
import { buscarDadosGrafico, excluirMedicoes, Medicao } from '@/database/glucose_measurements';
import { getCurrentDate } from '@/utils/getCurrentDate';

type Period = '7d' | '3m' | '6m';
type Level = 'low' | 'normal' | 'high';

// Quantos dias cada período representa na consulta ao banco.
const DIAS_POR_PERIODO: Record<Period, 7 | 90 | 180> = {
  '7d': 7,
  '3m': 90,
  '6m': 180,
};

const DIAS_DA_SEMANA_ABREVIADOS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MESES_ABREVIADOS = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
];

// No período de 7 dias o rótulo do gráfico mostra o dia da semana,
// nos períodos mais longos mostra o mês (mais legível com muitos pontos).
function rotuloDoGrafico(dataISO: string, period: Period) {
  const data = new Date(dataISO);
  return period === '7d'
    ? DIAS_DA_SEMANA_ABREVIADOS[data.getDay()]
    : MESES_ABREVIADOS[data.getMonth()];
}

function horarioFormatado(dataISO: string) {
  const data = new Date(dataISO);
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function History() {

  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const hoje = getCurrentDate();

  const [period, setPeriod] = useState<Period>('7d');
  const [levelFilter, setLevelFilter] = useState<Level | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [measurements, setMeasurements] = useState<Medicao[]>([]);

  const carregarMedicoes = useCallback(async () => {
    if (!user) {
      return;
    }

    const dados = await buscarDadosGrafico(user.id, DIAS_POR_PERIODO[period]);
    setMeasurements(dados);
  }, [user, period]);

  useFocusEffect(
    useCallback(() => {
      carregarMedicoes();
    }, [carregarMedicoes])
  );

  const periods: { label: string; value: Period }[] = [
    {
      label: 'Últimos 7 dias',
      value: '7d',
    },
    {
      label: 'Últimos 3 meses',
      value: '3m',
    },
    {
      label: 'Últimos 6 meses',
      value: '6m',
    },
  ];

  const handlePeriodChange = (value: Period | null) => {
    if (value) {
      setPeriod(value);
    }
  };

  const handleLongPress = (id: number) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev;
      }

      return [...prev, id];
    });
  };

  const handlePress = (id: number) => {

    if (selectedIds.length === 0) {
      return;
    }

    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (!user || selectedIds.length === 0) {
      return;
    }

    await excluirMedicoes(selectedIds, user.id);
    setSelectedIds([]);
    carregarMedicoes();
  };

  const filteredMeasurements = levelFilter
    ? measurements.filter(item => item.classification === levelFilter)
    : measurements;

  // Mais recentes primeiro (buscarDadosGrafico retorna em ordem crescente,
  // pensada para o gráfico de linha).
  const measurementsMaisRecentesPrimeiro = [...filteredMeasurements].reverse();

  const chartData = measurements.map((medicao) => ({
    value: medicao.glucose_level,
    label: rotuloDoGrafico(medicao.measured_at, period),
  }));

  return (
    <Scroll
      style={styles.container}
      overlay={
        selectedIds.length > 0 ? (
          <SelectionBar
            selectedCount={selectedIds.length}
            onCancel={() => setSelectedIds([])}
            onDelete={handleDelete}
          />
        ) : null
      }
    >

      <View style={styles.header}>
        <HeaderSection
          title="Consulte seu histórico de glicemia e acompanhe suas variações."
          subtitle="Histórico"
          haveSub={true}
        />
      </View>

      <View style={styles.chart}>

        <Dropdown
          value={period}
          onChange={handlePeriodChange}
          items={periods}
          placeholder="Período"
          style={dropdownStyles.dropdown}
          textStyle={dropdownStyles.dropdownText}
          dropDownContainerStyle={dropdownStyles.dropdownContainer}
        />

        <LineChart
          data={chartData}
          period={period}
        />

      </View>

      <View style={styles.filter}>
        <Filter value={levelFilter} onChange={setLevelFilter} />
      </View>

      <View style={{ gap: 12, marginTop: 24 }}>

        <Text style={styles.label}>
          Hoje, {hoje.month.charAt(0).toUpperCase() + hoje.month.slice(1)} {hoje.dayNumber}
        </Text>

        {measurementsMaisRecentesPrimeiro.map(item => (
          <Card
            key={item.id}
            level={item.classification as 'low' | 'normal' | 'high'}
            glucoseLevel={item.glucose_level}
            time={horarioFormatado(item.measured_at)}
            selected={selectedIds.includes(item.id)}
            onLongPress={() => handleLongPress(item.id)}
            onPress={() => handlePress(item.id)}
          />
        ))}

      </View>

    </Scroll>
  );
}
