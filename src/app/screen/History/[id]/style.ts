import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import { fonts } from '@/theme/fonts'

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Mesma "chrome" do BackButton (círculo com blur e borda gray[700]),
  // só trocando o ícone e a cor por um vermelho discreto.
  deleteButton: {
    overflow: 'hidden',
    borderRadius: 44,
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  deleteBlur: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  hero: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
    gap: 12,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  high: {
    backgroundColor: colors.red[500],
  },
  normal: {
    backgroundColor: colors.green[600],
  },
  low: {
    backgroundColor: colors.sky[600],
  },
  heroValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  heroValue: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.bold,
    fontSize: 44,
  },
  heroUnit: {
    color: colors.gray[500],
    fontFamily: fonts.hankenGrotesk.regular,
    fontSize: 14,
    marginBottom: 8,
  },
  heroLevel: {
    color: colors.gray[400],
    fontFamily: fonts.hankenGrotesk.medium,
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  panel: {
    borderWidth: 1,
    borderColor: colors.gray[700],
    borderRadius: 32,
    backgroundColor: colors.onyx,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.gray[700],
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    color: colors.gray[500],
    textTransform: 'uppercase',
    fontFamily: fonts.hankenGrotesk.medium,
    fontSize: 12,
    marginBottom: 2,
  },
  rowValue: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.medium,
    fontSize: 15,
  },

  notes: {
    marginTop: 24,
  },
  notesLabel: {
    color: colors.gray[400],
    textTransform: 'uppercase',
    fontFamily: fonts.hankenGrotesk.medium,
    fontSize: 14,
    marginBottom: 12,
  },
  notesBox: {
    borderWidth: 1,
    borderColor: colors.gray[700],
    borderRadius: 12,
    padding: 16,
    backgroundColor: colors.onyx,
  },
  notesText: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.regular,
    fontSize: 14,
    lineHeight: 20,
  },

  // Mesmo padrão do RegisterButton (FAB), mas com o ícone de editar.
  editButton: {
    position: 'absolute',
    bottom: 52,
    right: 24,
    backgroundColor: colors.emerald[500],
    padding: 18,
    borderRadius: 44,
    shadowColor: colors.emerald[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});