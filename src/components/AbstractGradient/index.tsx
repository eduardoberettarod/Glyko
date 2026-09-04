import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Svg, { Defs, RadialGradient, Stop, Circle, Rect } from "react-native-svg";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

// Paleta emerald que você passou
const emerald = {
  100: "#ecfdf5",
  200: "#d1fae5",
  300: "#a7f3d0",
  400: "#6ee7b7",
  500: "#10b981",
  600: "#059669",
  700: "#047857",
  800: "#065f46",
  900: "#064e3b",
};

type AbstractGradientProps = {
  /** Altura do componente (necessária pois ele fica absolute, colado em top/left/right) */
  height?: number;
  /** Raio da borda inferior (opcional, já que ele costuma ficar colado no topo) */
  borderRadius?: number;
  /** Intensidade do blur (0-100). É esse blur que dá o efeito "se desfazendo" */
  blurIntensity?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export default function AbstractGradient({
  height = 400,
  borderRadius = 0,
  blurIntensity = 65,
  style,
  children,
}: AbstractGradientProps) {
  return (
    <View
      style={[
        styles.container,
        { height, borderRadius },
        style,
      ]}
    >
      {/* 1. Fundo bem escuro (base) */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#050706" }]} />

      {/* 2. Formas orgânicas com gradiente radial emerald (o "corpo" da luz) */}
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          {/* Blob principal, mais claro, canto superior esquerdo */}
          <RadialGradient id="blobA" cx="32%" cy="18%" r="70%">
            <Stop offset="0%" stopColor={emerald[100]} stopOpacity={1} />
            <Stop offset="35%" stopColor={emerald[300]} stopOpacity={0.95} />
            <Stop offset="70%" stopColor={emerald[500]} stopOpacity={0.55} />
            <Stop offset="100%" stopColor={emerald[700]} stopOpacity={0} />
          </RadialGradient>

          {/* Blob secundário, mais saturado, deslocado à direita */}
          <RadialGradient id="blobB" cx="75%" cy="10%" r="55%">
            <Stop offset="0%" stopColor={emerald[400]} stopOpacity={0.9} />
            <Stop offset="55%" stopColor={emerald[600]} stopOpacity={0.5} />
            <Stop offset="100%" stopColor={emerald[900]} stopOpacity={0} />
          </RadialGradient>

          {/* Reflexo sutil embaixo, pra não ficar 100% morto */}
          <RadialGradient id="blobC" cx="50%" cy="55%" r="45%">
            <Stop offset="0%" stopColor={emerald[700]} stopOpacity={0.35} />
            <Stop offset="100%" stopColor={emerald[900]} stopOpacity={0} />
          </RadialGradient>
        </Defs>

        <Rect x="0" y="0" width="100%" height="100%" fill="url(#blobC)" />
        <Circle cx="70%" cy="12%" r="55%" fill="url(#blobB)" />
        <Circle cx="35%" cy="20%" r="60%" fill="url(#blobA)" />
      </Svg>

      {/* 3. O blur "derrete" as formas do SVG, criando o efeito de dissipação */}
      <BlurView
        intensity={blurIntensity}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />

      {/* 4. Fade final para o preto, reforçando a sensação de profundidade */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.35)", "rgba(0,0,0,0.95)"]}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Conteúdo (texto, botões, etc) por cima de tudo */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    backgroundColor: emerald[900],
  },
  content: {
    flex: 1,
  },
});