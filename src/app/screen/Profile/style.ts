import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import { fonts } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18
  },
  header: {
    marginTop: 32,
    alignItems: 'center',
    marginBottom: 24
  },
  user: {
    fontFamily: fonts.hankenGrotesk.medium,
    fontSize: 28,
    color: colors.white
  },
  diabetes: {
    fontFamily: fonts.hankenGrotesk.regular,
    fontSize: 16,
    color: colors.gray[500]
  },
  info: {
    alignItems: 'center',
    marginTop: 24
  }
});
