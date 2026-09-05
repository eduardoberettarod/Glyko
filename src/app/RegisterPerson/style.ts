import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import { fonts } from '@/theme/fonts'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: 18,
    zIndex: 2,
  },
  image: {
    width: 75,
    height: 75,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 18,
    zIndex: 1,
  },
  welcomeContainer: {
    flexDirection: 'column',
    gap: 4,
    marginBottom: 8,
  },
  textContainer: {
    marginBottom: 32,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.medium,
    fontSize: 34,
  },
  glyko: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.bold,
    fontSize: 34,
    fontWeight: 700,
  },
  subtitle: {
    color: colors.gray[400],
    fontFamily: fonts.hankenGrotesk.regular,
  },
  form: {
    gap: 16,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameField: {
    flex: 1,
  },
  footer: {
    gap: 10,
    marginTop: 32,
  },
  pagination: {
    alignSelf: 'center',
    marginBottom: 4,
  },
});