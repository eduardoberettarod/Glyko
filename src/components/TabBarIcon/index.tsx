import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { Icon } from '@/utils/icon'
import { styles } from './style';

type IconName = 'house' | 'history' | 'person'

type TabBarIconProps = TouchableOpacityProps & {
  name: IconName
  size?: number
  active?: boolean
}

export default function TabBarIcon({ name, size = 24, active = false, style, ...rest }: TabBarIconProps) {
  return (
    <TouchableOpacity
      style={[styles.button, active ? styles.activeButton : styles.inactiveButton, style]}
      {...rest}
      activeOpacity={0.8}
    >
      <Icon name={name} size={size} />
    </TouchableOpacity>
  )
}