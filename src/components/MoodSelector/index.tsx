import React, { useState } from 'react';
import { View } from 'react-native';
import { RadioIconInput } from '@/components/RadioIconInput';
import { styles } from './style';

export type MoodId = 'happy' | 'sad' | 'tired' | 'anxious' | 'stressed';

export const MOODS: { id: MoodId; label: string; iconName: string }[] = [
  { id: 'happy', label: 'Feliz', iconName: 'emoticon-happy-outline' },
  { id: 'sad', label: 'Triste', iconName: 'emoticon-sad-outline' },
  { id: 'tired', label: 'Cansado', iconName: 'battery-outline' },
  { id: 'anxious', label: 'Ansioso', iconName: 'emoticon-confused-outline' },
  { id: 'stressed', label: 'Estressado', iconName: 'emoticon-dead-outline' },
]

interface MoodSelectorProps {
  /** Humor selecionado (uso controlado). Se omitido, o componente controla seu próprio estado. */
  value?: MoodId | null;
  /** Chamado com o novo humor sempre que o usuário selecionar uma opção */
  onChange?: (value: MoodId) => void;
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  const [internalValue, setInternalValue] = useState<MoodId>('happy');
  const selected = value ?? internalValue;

  function handleSelect(id: MoodId) {
    setInternalValue(id);
    onChange?.(id);
  }

  return (
    <View style={styles.row}>
      {MOODS.map((mood) => (
        <RadioIconInput
          key={mood.id}
          iconName={mood.iconName as any}
          label={mood.label}
          selected={selected === mood.id}
          onPress={() => handleSelect(mood.id)}
        />
      ))}
    </View>
  );
}