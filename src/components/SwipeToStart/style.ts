import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

export const styles = StyleSheet.create({

  container: {
    height: 72,
    flex: 1,
    borderRadius: 44,
    backgroundColor: colors.onyx,
    justifyContent: 'center',
    paddingHorizontal: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 44,
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.medium,
    fontSize: 15,
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginRight: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    height: 60,
    borderRadius: 44,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  arrow: {
    position: 'absolute',
    right: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});