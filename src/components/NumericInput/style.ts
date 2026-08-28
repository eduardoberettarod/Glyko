import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors'; // ajuste o caminho para o seu arquivo de tema
import { fonts } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    color: colors.gray[400],
    textTransform: 'uppercase',
    fontFamily: fonts.hankenGrotesk.medium,
    marginBottom: 12,
    textAlign: 'center',
  },
  underline: {
    alignSelf: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.gray[700],
    paddingBottom: 8,
  },
  underlineFocused: {
    borderBottomColor: colors.emerald[500],
  },
  underlineError: {
    borderBottomColor: colors.red ? colors.red[500] : '#EF4444',
  },
  input: {
    padding: 0,
    height: 88,
    fontSize: 72,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: colors.red ? colors.red[500] : '#EF4444',
    textAlign: 'center',
  },
});