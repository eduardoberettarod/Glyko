import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import { fonts } from '@/theme/fonts';


export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.gray[700],
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    gap: 12,
    borderRadius: 222
  },
  icon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.gray[700],
    borderRadius: 44
  },
  title: {
    color: colors.emerald[500],
    fontFamily: fonts.hankenGrotesk.medium,
    fontSize: 14
  },
  text: {
    color: colors.gray[400],
    fontFamily: fonts.hankenGrotesk.medium,
    fontSize: 14
  },
  right: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2
  }
});