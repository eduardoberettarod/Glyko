import React, { useState } from 'react';
import { View } from 'react-native';
import { RadioIconInput } from '@/components/RadioIconInput';
import { styles } from './style';

const MOODS = [
  { id: 'feliz', label: 'Feliz', iconName: 'emoticon-happy-outline' as const },
  { id: 'triste', label: 'Triste', iconName: 'emoticon-sad-outline' as const },
  { id: 'cansado', label: 'Cansado', iconName: 'battery-outline' as const },
  { id: 'ansioso', label: 'Ansioso', iconName: 'emoticon-confused-outline' as const },
  { id: 'estressado', label: 'Estressado', iconName: 'emoticon-dead-outline' as const },
];

export function MoodSelector() {
  const [selected, setSelected] = useState<string>('feliz');

  return (
    <View style={styles.row}>
      {MOODS.map((mood) => (
        <RadioIconInput
          key={mood.id}
          iconName={mood.iconName}
          label={mood.label}
          selected={selected === mood.id}
          onPress={() => setSelected(mood.id)}
        />
      ))}
    </View>
  );
}