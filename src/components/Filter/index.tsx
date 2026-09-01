// src/components/Filter/index.tsx
import { Pressable, View, Text } from 'react-native'
import React from 'react'
import { styles } from './style';

export type FilterType = 'normal' | 'high' | 'low';

type Props = {
  value: FilterType | null;
  onChange: (filter: FilterType | null) => void;
};

export default function Filter({ value, onChange }: Props) {

  const handleFilter = (filter: FilterType) => {
    onChange(value === filter ? null : filter);
  };

  return (
    <View style={styles.container}>

      <Pressable
        style={[styles.left, value === 'normal' && styles.selected]}
        onPress={() => handleFilter('normal')}
      >
        <Text style={[styles.normal, value === 'normal' && styles.selectedText]}>Normal</Text>
      </Pressable>

      <Pressable
        style={[styles.middle, value === 'high' && styles.selected]}
        onPress={() => handleFilter('high')}
      >
        <Text style={[styles.normal, value === 'high' && styles.selectedText]}>Alta</Text>
      </Pressable>

      <Pressable
        style={[styles.right, value === 'low' && styles.selected]}
        onPress={() => handleFilter('low')}
      >
        <Text style={[styles.normal, value === 'low' && styles.selectedText]}>Baixa</Text>
      </Pressable>

    </View>
  )
}