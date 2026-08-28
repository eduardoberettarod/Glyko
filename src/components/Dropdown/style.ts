import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  dropdown: {
    borderColor: colors.gray[700],
    borderRadius: 44,
    backgroundColor: colors.onyx,
    paddingHorizontal: 24,
    minHeight: 52,
  },

  dropdownText: {
    fontSize: 16,
    color: colors.gray[300],
  },

  dropdownContainer: {
    borderColor: colors.gray[700],
    backgroundColor: colors.onyx,
    borderRadius: 16,
    overflow: 'hidden',
    maxHeight: 500
  },

  listItemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  listItemLabel: {
    fontSize: 15,
    color: colors.gray[300],
    lineHeight: 20,
  },

  selectedItemContainer: {
    backgroundColor: colors.emerald[500],
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  selectedItemLabel: {
    fontSize: 15,
    color: colors.gray[300],
    lineHeight: 20,
  },

  itemSeparator: {
    height: 1,
    backgroundColor: colors.gray[700],
    marginHorizontal: 12,
  },
});