import { View, Text } from 'react-native'
import React from 'react'
import HeaderSection from '@/components/HeaderSection';

export default function Register() {
  return (
    <View>
      <HeaderSection 
      title={'Registro de Glicemia'}
      subtitle={'Registre agora a sua glicemia.'}
      />
    </View>
  )
}