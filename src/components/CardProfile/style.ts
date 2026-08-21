import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import { fonts } from '@/theme/fonts'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 26,
  },
  text: {
    color: colors.gray[400],
    fontFamily: fonts.hankenGrotesk.regular,
    fontSize: 16
  },
  info: {
    color: colors.gray[400],
    fontFamily: fonts.hankenGrotesk.regular,
    fontSize: 12
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  }
});