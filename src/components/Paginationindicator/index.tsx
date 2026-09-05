import React, { useEffect } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { colors } from "@/theme/colors";

type DotProps = {
  active: boolean;
  activeColor: string;
  inactiveColor: string;
  dotSize: number;
  activeWidth: number;
  activeHeight: number;
  duration: number;
  glowRadius: number;
  glowOpacity: number;
};

function Dot({
  active,
  activeColor,
  inactiveColor,
  dotSize,
  activeWidth,
  activeHeight,
  duration,
  glowRadius,
  glowOpacity,
}: DotProps) {
  const progress = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(active ? 1 : 0, { duration });
  }, [active, duration, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const width = dotSize + progress.value * (activeWidth - dotSize);
    const height = dotSize + progress.value * (activeHeight - dotSize);
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [inactiveColor, activeColor]
    );

    return {
      width,
      height,
      backgroundColor,
      // Glow: só aparece (e cresce) conforme o dot fica ativo
      shadowColor: activeColor,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: progress.value * glowOpacity,
      shadowRadius: progress.value * glowRadius,
      elevation: progress.value * glowRadius, // sombra no Android (sem cor, mas dá profundidade)
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

type PaginationIndicatorProps = {
  /** Quantidade total de páginas/passos */
  total: number;
  /** Índice da página atual (0-based) */
  activeIndex: number;
  /** Cor do traço ativo. Default: emerald[500] */
  activeColor?: string;
  /** Cor dos traços inativos. Default: gray[700] */
  inactiveColor?: string;
  /** Altura/espessura de cada traço quando inativo */
  dotSize?: number;
  /** Largura do traço quando ativo */
  activeWidth?: number;
  /** Altura do traço quando ativo (fica um pouco maior que os inativos) */
  activeHeight?: number;
  /** Espaço entre os traços */
  gap?: number;
  /** Duração da animação de transição (ms) */
  duration?: number;
  /** Alcance do glow (shadowRadius/elevation) no traço ativo */
  glowRadius?: number;
  /** Intensidade do glow (shadowOpacity) no traço ativo */
  glowOpacity?: number;
  style?: StyleProp<ViewStyle>;
};

export default function PaginationIndicator({
  total,
  activeIndex,
  activeColor = colors.emerald[500],
  inactiveColor = colors.gray[700],
  dotSize = 6,
  activeWidth = 36,
  activeHeight = 5,
  gap = 6,
  duration = 250,
  glowRadius = 2,
  glowOpacity = 10,
  style,
}: PaginationIndicatorProps) {
  return (
    <View style={[styles.container, { gap }, style]}>
      {Array.from({ length: total }).map((_, index) => (
        <Dot
          key={index}
          active={index === activeIndex}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          dotSize={dotSize}
          activeWidth={activeWidth}
          activeHeight={activeHeight}
          duration={duration}
          glowRadius={glowRadius}
          glowOpacity={glowOpacity}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    borderRadius: 999, // garante formato de pílula mesmo com a altura animando
  },
});