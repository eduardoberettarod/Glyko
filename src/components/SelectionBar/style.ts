import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

export const styles = StyleSheet.create({

  container: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    backgroundColor: colors.onyx,
    borderWidth: 1,
    borderColor: colors.gray[700],
    borderRadius: 24,
    zIndex: 2,
    borderBottomWidth: 1,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
  },

  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontFamily: fonts.hankenGrotesk.medium,
    fontSize: 16,
    color: colors.gray[300],
  },

});