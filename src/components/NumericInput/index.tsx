import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { colors } from '@/theme/colors'; // ajuste o caminho para o seu arquivo de tema
import { styles } from './style';

type NumericInputProps = {
  value: string;
  onChange: (digitsOnly: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  maxLength?: number;
};

// largura aproximada de um dígito no tamanho de fonte usado (72px, bold)
const DIGIT_WIDTH = 56;
const DEFAULT_MAX_LENGTH = 3;

export function NumericInput({
  value,
  onChange,
  label,
  placeholder,
  error,
  maxLength = DEFAULT_MAX_LENGTH,
}: NumericInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  function handleChangeText(text: string) {
    // remove qualquer caractere que não seja dígito (bloqueia colar texto, "-", ".", etc.)
    const digitsOnly = text.replace(/[^0-9]/g, '');
    onChange(digitsOnly);
  }

  // a linha embaixo do input tem largura fixa: cabe exatamente `maxLength` dígitos,
  // nem mais nem menos, então ela não se estica com o texto digitado.
  const underlineWidth = maxLength * DIGIT_WIDTH;

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.underline,
          { width: underlineWidth },
          isFocused && styles.underlineFocused,
          !!error && styles.underlineError,
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={colors.gray[500]}
          keyboardType="number-pad"
          inputMode="numeric"
          maxLength={maxLength}
          selectionColor={colors.emerald[500]}
        />
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}