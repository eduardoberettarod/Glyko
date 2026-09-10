import { View, Text, TouchableOpacity, TouchableOpacityProps, Switch } from 'react-native'
import React from 'react'
import { Icon } from '@/utils/icon';
import { styles } from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { IconName } from '@/utils/icon'

type Props = TouchableOpacityProps & {
  icon: IconName,
  text: string,
  info?: string,
  /** Quando informado, exibe um switch em vez do texto/seta de navegação. */
  toggleValue?: boolean,
  onToggleChange?: (value: boolean) => void,
}

export default function CardProfile({ icon, text, info, toggleValue, onToggleChange, ...rest }: Props) {
  const isToggle = onToggleChange !== undefined;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={isToggle ? 1 : 0.8}
      disabled={isToggle}
      {...rest}
    >
      <View style={styles.left}>
        <Icon name={icon} size={18} />
        <Text style={styles.text}>{text}</Text>
      </View>

      <View style={styles.right}>
        {isToggle ? (
          <Switch
            value={!!toggleValue}
            onValueChange={onToggleChange}
            trackColor={{ false: colors.gray[700], true: colors.emerald[500] }}
            thumbColor={colors.white}
          />
        ) : (
          <>
            <Text style={styles.info}>{info}</Text>
            <MaterialCommunityIcons name={'chevron-right'} size={16} color={colors.white} />
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}