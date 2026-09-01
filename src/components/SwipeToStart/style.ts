import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

export const styles = StyleSheet.create({

  container: {
    height: 64,
    width: '100%',

    borderRadius: 32,

    backgroundColor: colors.onyx,

    justifyContent: 'center',

    paddingHorizontal: 6,

    overflow: 'hidden',
  },

  title: {
    position: 'absolute',

    alignSelf: 'center',

    color: colors.white,

    fontFamily: fonts.hankenGrotesk.medium,
    fontSize: 15,
  },

  button: {
    width: 52,
    height: 52,

    borderRadius: 26,

    backgroundColor: colors.white,

    alignItems: 'center',
    justifyContent: 'center',
  },

  arrow: {
    color: colors.onyx,

    fontFamily: fonts.hankenGrotesk.medium,
    fontSize: 24,

    lineHeight: 26,
  },

});