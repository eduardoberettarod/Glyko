import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { styles } from './style'
import { BlurView } from 'expo-blur';

// Botão de voltar reutilizável que repassa todas as props de TouchableOpacity recebidas.
export default function BackButton({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      {...rest}
    >
      <BlurView
        style={styles.blur}
        tint={'dark'}
        pointerEvents="none"
        intensity={80}
      >
        <EvilIcons name="chevron-left" size={24} color={colors.gray[100]} />
      </BlurView>
    </TouchableOpacity>
  )
}