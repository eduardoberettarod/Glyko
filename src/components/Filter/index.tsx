import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style';

export default function Filter() {
  return (
    <View style={styles.container}>

      <View style={styles.left}>
        <Text style={styles.normal}>Normal</Text>
      </View>

      <View style={styles.middle}>
        <Text style={styles.high}>Alta</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.low}>Baixa</Text>
      </View>

    </View>
  )
}