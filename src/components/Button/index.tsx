import { Text, TouchableOpacity, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './style';
import { colors } from '@/theme/colors';

type Props = TouchableOpacityProps & {
  title: string,
  haveIcon?: boolean,
  icon?: keyof typeof FontAwesome.glyphMap,
  color?: string,
  borderColor: string,
  colorText?: string,
  style?: StyleProp<ViewStyle>
}

export default function Button({
  title,
  haveIcon = false,
  icon,
  color = 'transparent',
  borderColor,
  colorText,
  style,
  ...rest }: Props) {
  const showIcon = haveIcon || !!icon;

  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          gap: 8,
          borderColor,
          backgroundColor: color,
          flexDirection: 'row',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {showIcon && icon ? (
        <FontAwesome name={icon} size={18} color={colorText ?? colors.white} />
      ) : null}
      <Text style={[styles.text, { color: colorText ?? colors.black }]}>{title}</Text>
    </TouchableOpacity>
  );
}