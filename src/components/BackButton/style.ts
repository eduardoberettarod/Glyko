import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'

export const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
    borderRadius: 44,
    borderWidth: 1,
    borderColor: colors.gray[700]
  },
  blur: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
});