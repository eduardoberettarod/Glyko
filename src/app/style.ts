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
    flexDirection: 'column',
    gap: 4,
    marginBottom: 12
  },
  subtitle: {
    color: colors.gray[400],
    fontFamily: fonts.hankenGrotesk.regular,
    
  },
  glyko: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.bold,
    fontSize: 48,
    fontWeight: 700
  },
  title: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.medium,
    fontSize: 48
  },
  textContainer: {
    marginBottom: 56
  },
  content: {
    paddingHorizontal: 18,
    zIndex: 2
  },
  header:{
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: 18,
    marginTop: 36
  },
  image: {
    width: 75,
    height: 75,
  }
});