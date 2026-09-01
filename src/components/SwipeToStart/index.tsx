import React from 'react';

import { Text, View } from 'react-native';

import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { styles } from './style';

interface SwipeToStartProps {
  onComplete?: () => void;
}

export default function SwipeToStart({
  onComplete,
}: SwipeToStartProps) {

  const translateX = useSharedValue(0);
  const containerWidth = useSharedValue(0);

  const BUTTON_SIZE = 52;
  const PADDING = 6;

  const gesture = Gesture.Pan()

    .onUpdate((event) => {

      const maxTranslate =
        containerWidth.value -
        BUTTON_SIZE -
        PADDING * 2;

      translateX.value = Math.max(
        0,
        Math.min(
          event.translationX,
          maxTranslate
        )
      );

    })

    .onEnd(() => {

      const maxTranslate =
        containerWidth.value -
        BUTTON_SIZE -
        PADDING * 2;

      const threshold = maxTranslate * 0.9;

      if (translateX.value >= threshold) {

        translateX.value = maxTranslate;

        runOnJS(console.log)('funcionou');

      } else {

        translateX.value = withSpring(0);

      }

    });

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        containerWidth.value =
          event.nativeEvent.layout.width;
      }}
    >

      <Text style={styles.title}>
        Deslize para começar
      </Text>

      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.button,
            animatedButtonStyle,
          ]}
        >
          <Text style={styles.arrow}>
            →
          </Text>
        </Animated.View>
      </GestureDetector>

    </View>
  );
}