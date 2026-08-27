import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './style';

//components
import HeaderSection from '@/components/HeaderSection';
import Filter from '@/components/Filter'
import Card from '@/components/Card';
import Scroll from '@/components/Scroll';
import LineChart from '@/components/LIneChart';
import Dropdown from '@/components/Dropdown';
import { styles as dropdownStyles } from '@/components/Dropdown/style';

export default function History() {

  const insets = useSafeAreaInsets()

  type Period = '7d' | '3m' | '6m';

  const [period, setPeriod] = useState<Period>('7d');

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

  return (
    <Scroll style={styles.container}>

      <View style={styles.header}>
        <HeaderSection
          title={'Consulte seu histórico de glicemia e acompanhe suas variações.'}
          subtitle={'Histórico'}
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
        <Filter />
      </View>

      <View style={{ gap: 12, marginTop: 24 }}>

        <Text style={styles.label}>Hoje, Agosto 19</Text>
        <Card
          level={'low'}
        />
        <Card
          level={'normal'}
        />
        <Card
          level={'high'}
        />
      </View>

    </Scroll>
  )
}