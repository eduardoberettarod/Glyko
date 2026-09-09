import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.onyx,
    borderWidth: 1,
    borderColor: colors.gray[700],
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  containerSelected: {
    borderColor: colors.emerald[500],
    borderWidth: 1.5,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexShrink: 1,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray[900],
  },
  iconSelected: {
    backgroundColor: colors.emerald[500],
  },
  textContainer: {
    flexShrink: 1,
    gap: 2,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.semiBold,
    fontSize: 15,
  },
  description: {
    color: colors.gray[400],
    fontFamily: fonts.hankenGrotesk.regular,
    fontSize: 12,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.gray[700],
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  radioOuterSelected: {
    borderColor: colors.emerald[500],
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: colors.emerald[500],
  },
});