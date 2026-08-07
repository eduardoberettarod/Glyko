import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './style'
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/theme/colors';

export default function Header({ }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GLYKO</Text>

      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <View style={styles.icon}>
          <FontAwesome6 name="caret-down" size={18} color={colors.white} />
        </View>
      </TouchableOpacity>
    </View>
  )
}