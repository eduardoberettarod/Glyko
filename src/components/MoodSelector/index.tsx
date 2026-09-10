import React, { useState } from 'react';
import { View } from 'react-native';
import { RadioIconInput } from '@/components/RadioIconInput';
import { styles } from './style';

const MOODS = [
  { id: 'happy', label: 'Feliz', iconName: 'emoticon-happy-outline' as const },
  { id: 'sad', label: 'Triste', iconName: 'emoticon-sad-outline' as const },
  { id: 'tired', label: 'Cansado', iconName: 'battery-outline' as const },
  { id: 'anxious', label: 'Ansioso', iconName: 'emoticon-confused-outline' as const },
  { id: 'stressed', label: 'Estressado', iconName: 'emoticon-dead-outline' as const },
]

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