import { View, Text } from 'react-native'
import React from 'react'
import { PieChart as GiftedPieChart } from 'react-native-gifted-charts'
import { colors } from '@/theme/colors'
import { styles } from './style'

export type MeasurementStatus = 'normal' | 'baixa' | 'alta'

export interface GlucoseMeasurement {
  status: MeasurementStatus
}

interface PieChartProps {
  measurements?: GlucoseMeasurement[]
}

// Duração (em ms) da animação de entrada do gráfico.
const ANIMATION_DURATION = 1000

const statusConfig = [
  { status: 'normal' as const, label: 'Normais', color: colors.green[600] },
  { status: 'alta' as const, label: 'Altas', color: colors.red[500] },
  { status: 'baixa' as const, label: 'Baixas', color: colors.sky[600] },
]

const exampleMeasurements: GlucoseMeasurement[] = [
  ...Array.from({ length: 10 }, () => ({ status: 'normal' as const })),
  ...Array.from({ length: 7 }, () => ({ status: 'baixa' as const })),
  ...Array.from({ length: 3 }, () => ({ status: 'alta' as const })),
]

// Junta cada status (normal/alta/baixa) com sua contagem e percentual
// dentro do total de medições, descartando os status sem nenhuma ocorrência.
function buildChartData(measurements: GlucoseMeasurement[]) {
  const total = measurements.length

  return statusConfig
    .map((item) => {
      const value = measurements.filter((measurement) => measurement.status === item.status).length
      const percentage = Math.round((value / total) * 100)

      return { ...item, value, text: `${percentage}%`, percentage }
    })
    .filter((item) => item.value > 0)
}

export default function PieChart({ measurements = exampleMeasurements }: PieChartProps) {
  if (measurements.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhuma medição disponível</Text>
      </View>
    )
  }

  const chartData = buildChartData(measurements)

  return (
    <View style={styles.container}>
      <GiftedPieChart
        data={chartData}
        donut
        isAnimated
        animationDuration={ANIMATION_DURATION}
        radius={100}
        innerRadius={50}
        innerCircleColor={colors.onyx}
        strokeColor={colors.gray[700]}
        strokeWidth={0}
      />

      <View style={styles.legend}>
        {chartData.map((item) => (
          <View key={item.status} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel}>
              {item.label.toUpperCase()} {item.percentage}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}