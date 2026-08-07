import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style';

type Props = {
  title: string,
  subtitle: string
}

export default function HeaderSection({ subtitle, title }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}