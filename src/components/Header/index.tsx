import { View, Text } from 'react-native'
import { styles } from './style'
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/theme/colors';

// Cabeçalho fixo exibido no topo das telas principais do app.
export default function Header() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GLYKO</Text>
    </View>
  )
}