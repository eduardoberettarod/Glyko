import React from 'react';

import { Text, View } from 'react-native';

import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

import {
  MaterialCommunityIcons,
  EvilIcons,
} from '@expo/vector-icons';

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { BlurView } from 'expo-blur';

import { styles } from './style';
import { colors } from '@/theme/colors';

interface SwipeToStartProps {
  onComplete?: () => void;
}

const BUTTON_SIZE = 60;
const PADDING = 6;

export default function SwipeToStart({
  onComplete,
}: SwipeToStartProps) {

  const growth = useSharedValue(0);
  const containerWidth = useSharedValue(0);

  const gesture = Gesture.Pan()

    .onUpdate((event) => {

      const maxGrowth =
        containerWidth.value -
        BUTTON_SIZE -
        PADDING * 2;

      growth.value = Math.max(
        0,
        Math.min(event.translationX, maxGrowth)
      );

    })

    .onEnd(() => {

      const maxGrowth =
        containerWidth.value -
        BUTTON_SIZE -
        PADDING * 2;

      const threshold = maxGrowth * 0.9;

      if (growth.value >= threshold) {

        growth.value = withSpring(maxGrowth);

        runOnJS(console.log)('funcionou');

      } else {

        growth.value = withSpring(0);
      }

    });

  const animatedButtonStyle = useAnimatedStyle(() => ({
    width: BUTTON_SIZE + growth.value,
  }));

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        containerWidth.value =
          event.nativeEvent.layout.width;
      }}
    >

      <BlurView
        intensity={80}
        tint="dark"
        style={styles.blur}
        pointerEvents="none"
      />

      <Text style={styles.title}>
        Começar
      </Text>

      <View style={styles.icon}>
        <EvilIcons name="chevron-right" size={16} color={colors.gray[500]} />
        <EvilIcons name="chevron-right" size={20} color={colors.gray[300]} />
        <EvilIcons name="chevron-right" size={24} color={colors.gray[100]} />
      </View>

      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.button,
            animatedButtonStyle,
          ]}
        >
          <View style={styles.arrow}>
            <MaterialCommunityIcons
              name="arrow-right"
              size={24}
              color={colors.onyx}
            />
          </View>
        </Animated.View>
      </GestureDetector>

    </View>
  );
}