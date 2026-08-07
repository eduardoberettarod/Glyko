import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap,
  title: string,
  text: string
}

export default function Alert({ icon, title, text }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <MaterialIcons name={icon} size={24} color={colors.emerald[500]} />
      </View>

      <View style={styles.right}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View >
  )
}