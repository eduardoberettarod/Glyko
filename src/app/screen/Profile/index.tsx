import { View, Text } from 'react-native'
import React from 'react'
import HeaderSection from '@/components/HeaderSection';

export default function Profile() {
  return (
    <View>
      <HeaderSection
          title={'Bom dia, Eduardo'}
          subtitle={'Visão Geral'}
        />
    </View>
  )
}