import React from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './style';


import HeaderSection from '@/components/HeaderSection';
import Filter from '@/components/Filter'
import Card from '@/components/Card';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';


export default function History() {

  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      <View style={styles.header}>
        <HeaderSection
          title={'Consulte seu histórico de glicemia e acompanhe suas variações.'}
          subtitle={'Histórico'}
          haveSub={true}
        />
      </View>

      <View style={styles.filter}>
        <Filter />
      </View>

      <View style={{ gap: 12, marginTop: 24 }}>

        <Text style={{color: colors.white, fontFamily: fonts.hankenGrotesk.medium, textTransform: 'uppercase' }}>Hoje, Agosto 19</Text>
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

    </View>
  )
}