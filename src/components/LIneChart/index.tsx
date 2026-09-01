import { View, Text, LayoutChangeEvent } from 'react-native'
import React, { useState } from 'react'
import { LineChart as GiftedLineChart, CurveType } from 'react-native-gifted-charts'
import { colors } from '@/theme/colors'
import { styles } from './style'

export type ChartPeriod = '7d' | '3m' | '6m'

export interface GlucoseTrendPoint {
  value: number
  label: string
}

interface LineChartProps {
  data?: GlucoseTrendPoint[]
  /**
   * Período exibido no gráfico. Quando `data` não é informado, o componente
   * usa o mock correspondente em `exampleDataByPeriod`.
   *
   * Pronto para a futura implementação do seletor de período (7 dias / 3 meses / 6 meses):
   * basta controlar esta prop a partir de um componente de filtro (mesmo padrão
   * do `src/components/Filter`) e, quando os dados reais existirem, passar o
   * array já filtrado via `data`.
   */
  period?: ChartPeriod
}

// Estimativa da largura de um caractere para a fonte/tamanho usados nos
// rótulos do eixo X. Serve apenas para calcular a margem necessária nas
// pontas do gráfico, evitando que o primeiro e o último rótulo fiquem
// cortados pelo próprio limite do gráfico (a lib sempre posiciona o
// primeiro ponto encostado na borda esquerda e o último na borda direita).
const AXIS_LABEL_CHAR_WIDTH_ESTIMATE = 6.5
const EDGE_SPACING_EXTRA_MARGIN = 4

// Espaçamento mínimo (em px) entre dois pontos consecutivos do gráfico.
// Aumente este valor se as legendas ainda estiverem muito próximas —
// quando o espaço mínimo não couber na largura do card, o gráfico passa
// a rolar horizontalmente (em vez de espremer os pontos para caber).
const MIN_POINT_SPACING = 50

function getEdgeSpacing(labels: string[]) {
  const longestLabelLength = labels.reduce((max, label) => Math.max(max, label.length), 0)
  return Math.ceil((longestLabelLength * AXIS_LABEL_CHAR_WIDTH_ESTIMATE) / 2) + EDGE_SPACING_EXTRA_MARGIN
}

// Converte uma cor hex do tema (#rrggbb) para rgba, usada para deixar as
// linhas de referência (máx/média/mín) mais suaves e transparentes sobre o
// gráfico, sem precisar de uma prop de opacidade (a lib não expõe uma).
function withOpacity(hexColor: string, alpha: number) {
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const REFERENCE_LINE_OPACITY = 0.5

const exampleDataByPeriod: Record<ChartPeriod, GlucoseTrendPoint[]> = {
  '6m': [
    { value: 55, label: 'Jan' },
    { value: 35, label: 'Fev' },
    { value: 65, label: 'Mar' },
    { value: 95, label: 'Abr' },
    { value: 30, label: 'Maio' },
    { value: 100, label: 'Jun' },
  ],
  '3m': [
    { value: 65, label: 'Abr' },
    { value: 30, label: 'Maio' },
    { value: 100, label: 'Jun' },
  ],
  '7d': [
    { value: 60, label: 'Dom' },
    { value: 42, label: 'Seg' },
    { value: 78, label: 'Ter' },
    { value: 50, label: 'Qua' },
    { value: 88, label: 'Qui' },
    { value: 66, label: 'Sex' },
    { value: 95, label: 'Sáb' },
  ],
}

export default function LineChart({ data, period = '6m' }: LineChartProps) {
  const [chartWidth, setChartWidth] = useState(0)

  const points = data ?? exampleDataByPeriod[period]

  const handleChartAreaLayout = (event: LayoutChangeEvent) => {
    setChartWidth(event.nativeEvent.layout.width)
  }

  if (points.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum dado disponível</Text>
      </View>
    )
  }

  const chartData = points.map((point) => ({
    value: point.value,
    label: point.label,
  }))

  const values = points.map((point) => point.value)
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)
  const averageValue = Math.round(
    values.reduce((sum, value) => sum + value, 0) / values.length
  )

  // Margem reservada nas duas pontas do gráfico para o texto dos rótulos
  // (centralizados em cada ponto) caber inteiro dentro da área visível.
  const edgeSpacing = getEdgeSpacing(points.map((point) => point.label))
  const fittedSpacing =
    chartWidth > 0 && points.length > 1 ? (chartWidth - edgeSpacing * 2) / (points.length - 1) : 0

  // Se o espaçamento "ajustado" (para caber tudo sem rolar) ficar menor que
  // o mínimo desejado, usamos o mínimo e liberamos a rolagem horizontal —
  // assim as legendas nunca ficam mais espremidas do que MIN_POINT_SPACING.
  const pointSpacing = Math.max(fittedSpacing, MIN_POINT_SPACING)
  const needsScroll = pointSpacing > fittedSpacing

  return (
    <View style={styles.container}>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <View style={[styles.statDot, styles.statDotHigh]} />
          <Text style={styles.statLabel}>Máxima</Text>
          <Text style={styles.statValue}>{maxValue}</Text>
        </View>

        <View style={styles.statItem}>
          <View style={[styles.statDot, styles.statDotAverage]} />
          <Text style={styles.statLabel}>Média</Text>
          <Text style={styles.statValue}>{averageValue}</Text>
        </View>

        <View style={styles.statItem}>
          <View style={[styles.statDot, styles.statDotLow]} />
          <Text style={styles.statLabel}>Mínima</Text>
          <Text style={styles.statValue}>{minValue}</Text>
        </View>
      </View>

      <View style={styles.chartArea} onLayout={handleChartAreaLayout}>
        {chartWidth > 0 && (
          <GiftedLineChart
            data={chartData}
            width={chartWidth}
            height={160}
            disableScroll={!needsScroll}
            showScrollIndicator={false}
            initialSpacing={edgeSpacing}
            endSpacing={edgeSpacing}
            spacing={pointSpacing}
            curved
            curveType={CurveType.CUBIC}
            isAnimated
            animationDuration={1200}
            areaChart
            color={colors.white}
            thickness={2.5}
            startFillColor={colors.emerald[500]}
            endFillColor={colors.emerald[500]}
            startOpacity={0.45}
            endOpacity={0}
            hideDataPoints
            yAxisThickness={0}
            xAxisThickness={0}
            xAxisColor="transparent"
            yAxisColor="transparent"
            hideYAxisText
            yAxisLabelWidth={0}
            noOfSections={2}
            rulesThickness={0}
            xAxisLabelTextStyle={styles.axisLabel}
            showReferenceLine1
            referenceLine1Position={maxValue}
            referenceLine1Config={{
              color: withOpacity(colors.red[500], REFERENCE_LINE_OPACITY),
              dashWidth: 4,
              dashGap: 4,
              thickness: 1,
            }}
            showReferenceLine2
            referenceLine2Position={averageValue}
            referenceLine2Config={{
              color: withOpacity(colors.gray[400], REFERENCE_LINE_OPACITY),
              dashWidth: 4,
              dashGap: 4,
              thickness: 1,
            }}
            showReferenceLine3
            referenceLine3Position={minValue}
            referenceLine3Config={{
              color: withOpacity(colors.sky[600], REFERENCE_LINE_OPACITY),
              dashWidth: 4,
              dashGap: 4,
              thickness: 1,
            }}
          />
        )}
      </View>
    </View>
  )
}