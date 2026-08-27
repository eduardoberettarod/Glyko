import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { PieChart as GiftedPieChart } from 'react-native-gifted-charts'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { colors } from '@/theme/colors'
import { styles } from './style'

export type MeasurementStatus = 'normal' | 'baixa' | 'alta'

export interface GlucoseMeasurement {
  status: MeasurementStatus
}

interface PieChartProps {
  measurements?: GlucoseMeasurement[]
}

// A versão gratuita da lib (react-native-gifted-charts) não anima as fatias
// do PieChart/DonutChart de fato — `isAnimated`/`animationDuration` só têm
// efeito no PieChart "Pro" (pago). Por isso animamos a entrada do card
// inteiro (fade + leve escala) com Reanimated em vez de depender da lib.
const ENTRANCE_DURATION = 500

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

// Toca o fade + escala assim que o card monta na tela.
function useEntranceAnimation() {
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(1, { duration: ENTRANCE_DURATION, easing: Easing.out(Easing.quad) })
  }, [progress])

  return useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.9 + progress.value * 0.1 }],
  }))
}

export default function PieChart({ measurements = exampleMeasurements }: PieChartProps) {
  const entranceStyle = useEntranceAnimation()

  if (measurements.length === 0) {
    return (
      <Animated.View style={[styles.emptyContainer, entranceStyle]}>
        <Text style={styles.emptyText}>Nenhuma medição disponível</Text>
      </Animated.View>
    )
  }

  const chartData = buildChartData(measurements)

  return (
    <Animated.View style={[styles.container, entranceStyle]}>
      <GiftedPieChart
        data={chartData}
        donut
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
    </Animated.View>
  )
}