import React, { useState } from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RadioCardInput } from '@/components/RadioCardInput';
import { styles } from './style';

export type DiabetesType = 'tipo1' | 'tipo2' | 'gestacional' | 'outro';

const DIABETES_TYPES: {
  id: DiabetesType;
  title: string;
  description: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
}[] = [
  {
    id: 'tipo1',
    title: 'Tipo 1',
    description: 'Produção insuficiente de insulina',
    iconName: 'needle',
  },
  {
    id: 'tipo2',
    title: 'Tipo 2',
    description: 'Resistência à insulina pelo organismo',
    iconName: 'food-apple-outline',
  },
  {
    id: 'gestacional',
    title: 'Gestacional',
    description: 'Diagnosticado durante a gravidez',
    iconName: 'human-pregnant',
  },
  {
    id: 'outro',
    title: 'Outro',
    description: 'Outro tipo ou ainda não diagnosticado',
    iconName: 'help-circle-outline',
  },
];

interface DiabetesTypeSelectorProps {
  /** Valor selecionado (uso controlado). Se omitido, o componente controla seu próprio estado. */
  value?: DiabetesType;
  /** Chamado com o novo tipo sempre que o usuário selecionar uma opção */
  onChange?: (value: DiabetesType) => void;
}

export function DiabetesTypeSelector({ value, onChange }: DiabetesTypeSelectorProps) {
  const [internalValue, setInternalValue] = useState<DiabetesType>('tipo1');
  const selected = value ?? internalValue;

  function handleSelect(id: DiabetesType) {
    setInternalValue(id);
    onChange?.(id);
  }

  return (
    <View style={styles.list}>
      {DIABETES_TYPES.map((type) => (
        <RadioCardInput
          key={type.id}
          iconName={type.iconName}
          title={type.title}
          description={type.description}
          selected={selected === type.id}
          onPress={() => handleSelect(type.id)}
        />
      ))}
    </View>
  );
}