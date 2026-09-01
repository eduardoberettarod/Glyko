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
	statsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 24,
	},
	statItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	statDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
	},
	statDotHigh: {
		backgroundColor: colors.red[500],
	},
	statDotAverage: {
		backgroundColor: colors.gray[400],
	},
	statDotLow: {
		backgroundColor: colors.sky[600],
	},
	statLabel: {
		color: colors.gray[400],
		fontFamily: fonts.hankenGrotesk.medium,
		fontSize: 11,
		textTransform: 'uppercase',
	},
	statValue: {
		color: colors.white,
		fontFamily: fonts.hankenGrotesk.semiBold,
		fontSize: 13,
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