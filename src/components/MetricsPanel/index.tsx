import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style';

interface MetricsPanelProps {
  average: number | null;
  highest: number | null;
  lowest: number | null;
  latest: number | null;
}

function formatValue(value: number | null) {
  return value === null ? '--' : String(value);
}

export default function MetricsPanel({ average, highest, lowest, latest }: MetricsPanelProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>

        <View style={styles.cell}>
          <Text style={styles.title}>Média Diária</Text>

          <View style={styles.valueContainer}>
            <Text style={styles.number}>{formatValue(average)}</Text>
            <Text style={styles.tag}>mg/dL</Text>
          </View>
        </View>

        <View style={[styles.cell, styles.leftBorder]}>
          <Text style={styles.title}>Mais Alto</Text>

          <View style={styles.valueContainer}>
            <Text style={styles.number}>{formatValue(highest)}</Text>
            <Text style={styles.tag}>mg/dL</Text>
          </View>
        </View>

      </View>

      <View style={styles.separator} />

      <View style={styles.row}>

        <View style={styles.cell}>
          <Text style={styles.title}>Mais Baixo</Text>

          <View style={styles.valueContainer}>
            <Text style={styles.number}>{formatValue(lowest)}</Text>
            <Text style={styles.tag}>mg/dL</Text>
          </View>
        </View>

        <View style={[styles.cell, styles.leftBorder]}>
          <Text style={styles.title}>Último Registro</Text>

          <View style={styles.valueContainer}>
            <Text style={styles.number}>{formatValue(latest)}</Text>
            <Text style={styles.tag}>mg/dL</Text>
          </View>
        </View>

      </View>
    </View>
  )
}