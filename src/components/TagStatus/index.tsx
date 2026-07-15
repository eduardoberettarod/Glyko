import { View, Text } from 'react-native'

import { styles } from './style'

type Props = {
  status: 'normal' | 'high' | 'low'
}

export default function TagStatus({ status }: Props) {
  return (
    <View
      style={[
        styles.container,
        status === 'normal' && styles.normalBorder,
        status === 'high' && styles.highBorder,
        status === 'low' && styles.lowBorder,
      ]}
    >
      {status === 'normal' && (
        <Text style={styles.normal}>Normal</Text>
      )}

      {status === 'high' && (
        <Text style={styles.high}>Alto</Text>
      )}

      {status === 'low' && (
        <Text style={styles.low}>Baixo</Text>
      )}
    </View>
  )
}