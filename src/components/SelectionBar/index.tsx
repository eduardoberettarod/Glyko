import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from './style';
import { colors } from '@/theme/colors';

type Props = {
  selectedCount: number;
  onCancel: () => void;
  onDelete: () => void;
};

export default function SelectionBar({
  selectedCount,
  onCancel,
  onDelete,
}: Props) {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={onCancel}
        activeOpacity={0.8}
        style={styles.button}
      >
        <MaterialCommunityIcons
          name="close"
          size={22}
          color={colors.gray[700]}
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        {selectedCount} selecionado
        {selectedCount !== 1 ? 's' : ''}
      </Text>

      <TouchableOpacity
        onPress={onDelete}
        activeOpacity={0.8}
        style={styles.button}
      >
        <Feather
          name="trash"
          size={18}
          color={colors.red[500]}
        />
      </TouchableOpacity>

    </View>
  );
}