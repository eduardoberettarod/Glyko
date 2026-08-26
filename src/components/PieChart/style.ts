import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: colors.onyx,
		borderColor: colors.gray[700],
		borderRadius: 30,
		borderWidth: 1,
		paddingBottom: 48,
		paddingTop: 48,
	},
	legend: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 24,
		paddingHorizontal: 18,
	},
	legendItem: {
		alignItems: 'center',
		flexDirection: 'row',
		marginHorizontal: 4,
	},
	legendColor: {
		borderRadius: 5,
		height: 8,
		marginRight: 8,
		width: 8,
	},
	legendLabel: {
		color: colors.gray[300],
		fontSize: 10,
		letterSpacing: 0.4,
		lineHeight: 12,
	},
	emptyContainer: {
		alignItems: 'center',
		backgroundColor: '#0d0d0d',
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