import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './style';
import { colors } from '@/theme/colors';

type LevelType = "low" | "high" | "normal"

type Props = {
  level: LevelType
}

export default function Card({ level }: Props) {

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>

      <View style={styles.left}>
        <View style={[
          styles.icon,
          level === 'normal' && styles.normal,
          level === 'low' && styles.low,
          level === 'high' && styles.high
        ]}>
          <MaterialCommunityIcons name="trending-up" size={24} color="black" />
        </View>
        <View style={styles.status}>
          <Text style={styles.glucose}>212 mg/dL</Text>
          <Text style={styles.level}>
            {level === 'normal' && 'normal'}
            {level === 'high' && 'alto'}
            {level === 'low' && 'baixo'}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.time}>12:16</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color={colors.gray[500]} />
      </View>

    </TouchableOpacity>
  )
}