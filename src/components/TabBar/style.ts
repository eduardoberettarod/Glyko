import { colors } from '@/theme/colors';
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  blur: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 6,
  },
  tabBar: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    left: '50%',
    transform: [{translateX: '-50%'}],
    gap: 14
  }
});