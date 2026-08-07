import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';


export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.gray[700],
    borderRadius: 32,
    overflow: "hidden",
    backgroundColor: colors.onyx
  },

  row: {
    flexDirection: "row",
  },

  cell: {
    flex: 1,
    padding: 24,
  },

  leftBorder: {
    borderLeftWidth: 1,
    borderColor: colors.gray[700],
    marginRight: 5
  },

  separator: {
    height: 1,
    backgroundColor: colors.gray[700],
  },

  title: {
    fontFamily: fonts.hankenGrotesk.semiBold,
    fontSize: 11,
    color: colors.white,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  valueContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 8,
  },

  number: {
    fontFamily: fonts.hankenGrotesk.regular,
    fontSize: 26,
    color: colors.white,
  },

  tag: {
    fontFamily: fonts.hankenGrotesk.regular,
    fontSize: 12,
    color: colors.gray[700],
    marginLeft: 8,
    marginBottom: 4,
  },
});