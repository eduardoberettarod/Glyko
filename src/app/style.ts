import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import { fonts } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  footer: {
    gap: 10
  },
  welcomeContainer: {
    marginBottom: 8
  },
  subtitle: {
    color: colors.gray[400],
    fontFamily: fonts.hankenGrotesk.regular,
    
  },
  glyko: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.bold,
    fontSize: 64,
    fontWeight: 700
  },
  title: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.light,
    fontSize: 64
  },
  textContainer: {
    marginBottom: 56
  },
  content: {
    paddingHorizontal: 18,
    zIndex: 2
  }
});