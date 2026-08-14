import { Pressable, View, Text } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style';

type FilterType = 'normal' | 'high' | 'low';

export default function Filter() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType | null>(null);

  const handleFilter = (filter: FilterType) => {
    setSelectedFilter(
      selectedFilter === filter ? null : filter
    );
  };

  return (
    <View style={styles.container}>

      <Pressable
        style={[
          styles.left,
          selectedFilter === 'normal' && styles.selected
        ]}
        onPress={() => handleFilter('normal')}
      >
        <Text style={styles.normal}>Normal</Text>
      </Pressable>

      <Pressable
        style={[
          styles.middle,
          selectedFilter === 'high' && styles.selected
        ]}
        onPress={() => handleFilter('high')}
      >
        <Text style={styles.high}>Alta</Text>
      </Pressable>

      <Pressable
        style={[
          styles.right,
          selectedFilter === 'low' && styles.selected
        ]}
        onPress={() => handleFilter('low')}
      >
        <Text style={styles.low}>Baixa</Text>
      </Pressable>

    </View>
  )
}