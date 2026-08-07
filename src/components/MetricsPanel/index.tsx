import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style';

export default function MetricsPanel() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>

        <View style={styles.cell}>
          <Text style={styles.title}>Média Diária</Text>

          <View style={styles.valueContainer}>
            <Text style={styles.number}>118</Text>
            <Text style={styles.tag}>mg/dL</Text>
          </View>
        </View>

        <View style={[styles.cell, styles.leftBorder]}>
          <Text style={styles.title}>Mais Alto</Text>

          <View style={styles.valueContainer}>
            <Text style={styles.number}>156</Text>
            <Text style={styles.tag}>mg/dL</Text>
          </View>
        </View>

      </View>

      <View style={styles.separator} />

      <View style={styles.row}>

        <View style={styles.cell}>
          <Text style={styles.title}>Mais Baixo</Text>

          <View style={styles.valueContainer}>
            <Text style={styles.number}>92</Text>
            <Text style={styles.tag}>mg/dL</Text>
          </View>
        </View>

        <View style={[styles.cell, styles.leftBorder]}>
          <Text style={styles.title}>Último Registro</Text>

          <View style={styles.valueContainer}>
            <Text style={styles.number}>98</Text>
            <Text style={styles.tag}>mg/dL</Text>
          </View>
        </View>

      </View>
    </View>
  )
}