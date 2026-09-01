import React, { useState } from 'react';

import { View, Text } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

type Period = '7d' | '3m' | '6m';

type Measurement = {
  id: string;
  level: 'low' | 'normal' | 'high';
};

export default function History() {

  const insets = useSafeAreaInsets();

  const [period, setPeriod] = useState<Period>('7d');
  const [levelFilter, setLevelFilter] = useState<Measurement['level'] | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Dados temporários
  // Futuramente serão substituídos pelos dados da API/banco
  const measurements: Measurement[] = [
    {
      id: '1',
      level: 'high',
    },
    {
      id: '2',
      level: 'normal',
    },
    {
      id: '3',
      level: 'low',
    },
  ];

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

  const handleLongPress = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev;
      }

      return [...prev, id];
    });
  };

  const handlePress = (id: string) => {

    if (selectedIds.length === 0) {
      return;
    }

    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const filteredMeasurements = levelFilter
    ? measurements.filter(item => item.level === levelFilter)
    : measurements;

  return (
    <Scroll
      style={styles.container}
      overlay={
        selectedIds.length > 0 ? (
          <SelectionBar
            selectedCount={selectedIds.length}
            onCancel={() => setSelectedIds([])}
            onDelete={() => {
              console.log('Excluir:', selectedIds);
            }}
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
          period={period}
        />

      </View>

      <View style={styles.filter}>
        <Filter value={levelFilter} onChange={setLevelFilter} />
      </View>

      <View style={{ gap: 12, marginTop: 24 }}>

        <Text style={styles.label}>
          Hoje, Agosto 19
        </Text>

        {filteredMeasurements.map(item => (
          <Card
            key={item.id}
            level={item.level}
            selected={selectedIds.includes(item.id)}
            onLongPress={() => handleLongPress(item.id)}
            onPress={() => handlePress(item.id)}
          />
        ))}

      </View>

    </Scroll>
  );
}