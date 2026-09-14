import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { styles } from './style';
import { router } from 'expo-router';

// Botão flutuante de "+" que leva o usuário para a tela de registro de uma nova medição.
export default function RegisterButton() {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => router.push('/screen/Register')}
    >
      <MaterialIcons name={'add'} size={24} color={colors.white} />
    </TouchableOpacity>
  )
}