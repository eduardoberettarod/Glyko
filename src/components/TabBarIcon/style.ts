import { colors } from '@/theme/colors';
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: colors.emerald[500],
  },
  inactiveButton: {
    backgroundColor: 'transparent',
  },
});