import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import { fonts } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.onyx,
    borderWidth: 1,
    borderColor: colors.gray[700],
    borderRadius: 24,
    paddingLeft: 18,
    paddingRight: 10,
    paddingVertical: 20,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12
  },
  high: {
    backgroundColor: colors.red[500],
    borderRadius: 12
  },
  normal: {
    backgroundColor: colors.green[600],
    borderRadius: 12
  },
  low: {
    backgroundColor: colors.sky[600],
    borderRadius: 12
  },
  time: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.semiBold,
    fontSize: 12
  },
  glucose: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.semiBold,
    fontSize: 18
  },
  status: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  level: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.medium,
    fontSize: 11,
    textTransform: 'uppercase'
  }
});