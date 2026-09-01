import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    flex: 1
  },
  header: {
    marginTop: 32
  },
  filter: {
    marginTop: 24
  },
  label: {
    color: colors.gray[400],
    textTransform: 'uppercase',
    fontFamily: fonts.hankenGrotesk.medium
  },
  chart: {
    gap: 12,
    marginTop: 24
  },
})