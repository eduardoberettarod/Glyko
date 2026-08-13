import { colors } from '@/theme/colors';
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    overflow: 'hidden',
    bottom: 80,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.gray[700],
    left: '50%',
    transform: [{translateX: '-50%'}]
  },
  blur: {
    padding: 12,
    flexDirection: 'row',
    gap: 12,
  }
});