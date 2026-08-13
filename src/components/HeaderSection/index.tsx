import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style';

type Props = {
  title: string,
  subtitle: string,
  haveSub?: boolean
}

export default function HeaderSection({
  subtitle,
  title,
  haveSub = false
}: Props) {
  return (
    <View style={styles.container}>
      {haveSub ? (
        <View>
          <Text style={styles.title}>{subtitle}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
    </View>
  )
}