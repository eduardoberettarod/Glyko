import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import { fonts } from '@/theme/fonts'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 18,
    zIndex: 1,
  },
  welcomeContainer: {
    flexDirection: 'column',
    marginBottom: 8,
    gap: 4
  },
  textContainer: {
    marginBottom: 32,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.light,
    fontSize: 64,
  },
  attention: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.bold,
    fontSize: 64,
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
    marginTop: 72,
  },
  pagination: {
    alignSelf: 'center',
    marginBottom: 4,
  },
});