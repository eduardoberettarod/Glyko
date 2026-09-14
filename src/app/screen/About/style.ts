import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import { fonts } from '@/theme/fonts'

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
  },

  section: {
    marginBottom: 28,
  },
  sectionLabel: {
    color: colors.gray[400],
    textTransform: 'uppercase',
    fontFamily: fonts.hankenGrotesk.medium,
    fontSize: 13,
    letterSpacing: 0.4,
    marginBottom: 12,
  },
  sectionBox: {
    borderWidth: 1,
    borderColor: colors.gray[700],
    borderRadius: 20,
    backgroundColor: colors.onyx,
    padding: 18,
  },
  paragraph: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.regular,
    fontSize: 14,
    lineHeight: 21,
  },
  paragraphSpacing: {
    marginTop: 12,
  },
});
