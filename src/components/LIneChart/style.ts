import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import { fonts } from '@/theme/fonts'

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.onyx,
		borderColor: colors.gray[700],
		borderRadius: 30,
		borderWidth: 1,
		paddingVertical: 32,
		paddingHorizontal: 20,
	},
	chartArea: {
		alignItems: 'flex-start',
	},
	axisLabel: {
		color: colors.gray[400],
		fontFamily: fonts.hankenGrotesk.medium,
		fontSize: 11,
		letterSpacing: 0.2,
    textTransform: 'uppercase'
	},
	emptyContainer: {
		alignItems: 'center',
		backgroundColor: colors.onyx,
		borderColor: colors.gray[700],
		borderRadius: 30,
		borderWidth: 1,
		padding: 32,
	},
	emptyText: {
		color: colors.gray[300],
		fontSize: 14,
	},
});