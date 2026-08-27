import { View, Text } from 'react-native'
import React from 'react'
import HeaderSection from '@/components/HeaderSection';
import { MoodSelector } from '@/components/MoodSelector';

export default function Register() {
  return (
    <View>
      <HeaderSection
        title={'Registro de Glicemia'}
        subtitle={'Registre agora a sua glicemia.'}
      />
      <MoodSelector />
    </View>
  )
}