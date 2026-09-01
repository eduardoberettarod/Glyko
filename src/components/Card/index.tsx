import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from './style';
import { colors } from '@/theme/colors';

type LevelType = 'low' | 'high' | 'normal';

type Props = {
  level: LevelType;
  selected?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
};

export default function Card({
  level,
  selected = false,
  onPress,
  onLongPress,
}: Props) {

  const iconName =
    level === 'normal'
      ? 'trending-neutral'
      : level === 'high'
        ? 'trending-up'
        : 'trending-down';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selectedContainer,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={500}
    >

      <View style={styles.left}>

        <View
          style={[
            styles.icon,

            level === 'normal' && styles.normal,
            level === 'low' && styles.low,
            level === 'high' && styles.high,

            selected && styles.selectedIcon,
          ]}
        >
          <MaterialCommunityIcons
            name={selected ? 'check' : iconName}
            size={24}
            color={selected ? colors.white : colors.black}
          />
        </View>

        <View style={styles.status}>
          <Text style={styles.glucose}>
            212 mg/dL
          </Text>

          <Text style={styles.level}>
            {level === 'normal' && 'normal'}
            {level === 'high' && 'alto'}
            {level === 'low' && 'baixo'}
          </Text>
        </View>

      </View>

      <View style={styles.right}>
        <Text style={[styles.time, selected && {marginRight: 8}]}>
          12:16
        </Text>

        {!selected && (
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={colors.gray[500]}
          />
        )}
      </View>

    </TouchableOpacity>
  );
}