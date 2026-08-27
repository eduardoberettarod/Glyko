import { View, TextInput, TextInputProps, Text } from 'react-native'
import React from 'react'
import { styles } from './style';

type Props = TextInputProps & {
  label?: string,
  isTextarea?: boolean
}

export default function Input({ label, isTextarea = false, ...rest }: Props) {
  return (
    <View style={styles.container}>

      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={isTextarea ? styles.textarea : styles.input}
        multiline={isTextarea}
        textAlignVertical={isTextarea ? 'top' : 'center'}
        {...rest}
      />
    </View>
  )
}