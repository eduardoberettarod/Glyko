import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'

export const styles = StyleSheet.create({
  container: {
    width: 175,
    height: 175,
    backgroundColor: colors.white,
    borderRadius:  444,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    backgroundColor: colors.emerald[500],
    borderRadius:  444,
  }
});