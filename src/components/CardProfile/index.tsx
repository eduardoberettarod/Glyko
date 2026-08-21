import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { Icon } from '@/utils/icon';
import { styles } from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { IconName } from '@/utils/icon'

type Props = TouchableOpacityProps & {
  icon: IconName,
  text: string,
  info?: string
}

export default function CardProfile({ icon, text, info, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
      <View style={styles.left}>
        <Icon name={icon} size={18} />
        <Text style={styles.text}>{text}</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.info}>{info}</Text>
        <MaterialCommunityIcons name={'chevron-right'} size={16} color={colors.white} />
      </View>
    </TouchableOpacity>
  )
}