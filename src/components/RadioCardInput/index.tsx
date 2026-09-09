import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './style';
import { colors } from '@/theme/colors';

interface RadioCardInputProps {
  /** Nome do ícone do MaterialCommunityIcons (@expo/vector-icons) */
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  /** Título principal exibido no card */
  title: string;
  /** Texto de apoio exibido abaixo do título */
  description: string;
  /** Se este card está selecionado */
  selected: boolean;
  /** Callback ao tocar no card */
  onPress: () => void;
}

/**
 * Card de seleção reutilizável com ícone, título, descrição e um radio
 * button à direita. Ao ser selecionado, a borda do card e o círculo
 * interno do radio ficam na cor colors.emerald[500].
 */
export function RadioCardInput({
  iconName,
  title,
  description,
  selected,
  onPress,
}: RadioCardInputProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, selected && styles.containerSelected]}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={title}
    >
      <View style={styles.left}>
        <View style={[styles.icon, selected && styles.iconSelected]}>
          <MaterialCommunityIcons
            name={iconName}
            size={22}
            color={selected ? colors.onyx : colors.gray[400]}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>

      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
}