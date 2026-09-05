import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import { fonts } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 8,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 14,
    color: colors.gray[400],
    textTransform: 'uppercase',
    fontFamily: fonts.hankenGrotesk.medium
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray[700],
    padding: 14,
    width: '100%',
    height: 52,
    borderRadius: 14,
    color: colors.white,
    backgroundColor: colors.onyx
  },
  textarea: {
    borderWidth: 1,
    borderColor: colors.gray[700],
    paddingHorizontal: 14,
    minHeight: 120,
    width: '100%',
    borderRadius: 12,
    color: colors.white,
    backgroundColor: colors.onyx,
  }
});