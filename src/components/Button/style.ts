import { fonts } from '@/theme/fonts';
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 222,
    borderWidth: 1,
    minHeight: 48,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.hankenGrotesk.regular,
    textTransform: 'uppercase'
  },
});