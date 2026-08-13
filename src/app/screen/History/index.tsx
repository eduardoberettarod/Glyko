import React from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './style';


import HeaderSection from '@/components/HeaderSection';
import Filter from '@/components/Filter'


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

    </View>
  )
}