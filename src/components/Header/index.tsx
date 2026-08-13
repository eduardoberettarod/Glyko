import { View, Text } from 'react-native'
import { styles } from './style'
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/theme/colors';

export default function Header() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GLYKO</Text>
    </View>
  )
}