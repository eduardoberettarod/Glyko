import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import { fonts } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    gap: 4
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontFamily: fonts.hankenGrotesk.medium
  },
  subtitle: {
    color: colors.gray[500],
    textTransform: 'uppercase',
    fontSize: 16,
    fontFamily: fonts.hankenGrotesk.medium,
    letterSpacing: 0.6
  }
});