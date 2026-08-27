import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors'; // ajuste o caminho conforme a estrutura do seu projeto

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  circleDefault: {
    backgroundColor: colors.onyx,
    borderColor: colors.gray[700],
  },
  circleSelected: {
    backgroundColor: colors.emerald[500],
    borderColor: colors.emerald[500],
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
  labelDefault: {
    color: colors.gray[400] ?? '#9CA3AF',
  },
  labelSelected: {
    color: '#FFFFFF',
  },
});

export const iconColor = {
  default: '#FFFFFF',
  selected: colors.onyx,
};