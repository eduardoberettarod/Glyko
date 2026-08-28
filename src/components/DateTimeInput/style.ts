import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors'; // ajuste o caminho para o seu arquivo de tema
import { fonts } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: colors.gray[400],
    textTransform: 'uppercase',
    fontFamily: fonts.hankenGrotesk.medium,
    marginBottom: 12
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: colors.onyx,
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  inputWrapperFocused: {
    borderColor: colors.emerald[500],
  },
  inputWrapperError: {
    borderColor: colors.red ? colors.red[500] : '#EF4444',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 15,
    color: colors.white,
  },
  placeholderText: {
    color: colors.gray[500],
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: colors.red ? colors.red[500] : '#EF4444',
  },
  iosPickerContainer: {
    backgroundColor: colors.onyx,
    borderTopWidth: 1,
    borderTopColor: colors.gray[700],
    paddingBottom: 24,
  },
  iosPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[700],
  },
  iosConfirmText: {
    color: colors.emerald[500],
    fontSize: 15,
    fontWeight: '600',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});