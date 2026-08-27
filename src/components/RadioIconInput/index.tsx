import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles, iconColor } from './style';

interface RadioIconInputProps {
  /** Nome do ícone do MaterialCommunityIcons (@expo/vector-icons) */
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  /** Texto exibido abaixo do input */
  label: string;
  /** Se este item está selecionado */
  selected: boolean;
  /** Callback ao tocar no input */
  onPress: () => void;
  /** Diâmetro do círculo (padrão: 56) */
  size?: number;
}

export function RadioIconInput({
  iconName,
  label,
  selected,
  onPress,
  size = 56,
}: RadioIconInputProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={styles.container}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      <View
        style={[
          styles.circle,
          selected ? styles.circleSelected : styles.circleDefault,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={size * 0.42}
          color={selected ? iconColor.selected : iconColor.default}
        />
      </View>

      <Text
        style={[
          styles.label,
          selected ? styles.labelSelected : styles.labelDefault,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}