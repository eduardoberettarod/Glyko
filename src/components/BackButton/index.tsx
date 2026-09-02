import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { styles } from './style'
import { BlurView } from 'expo-blur';

export default function BackButton({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity style={styles.button}>
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