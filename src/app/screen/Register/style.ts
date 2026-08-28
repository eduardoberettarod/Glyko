import { StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import { fonts } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18
  },
  moodSelector: {
    marginTop: 24
  },
  label: {
    color: colors.gray[400],
    textTransform: 'uppercase',
    fontFamily: fonts.hankenGrotesk.medium,
    marginBottom: 12
  },
  footer: {
    marginTop: 24
    
  },
  observation: {
    marginTop: 48
  },
  contextMedication: {
    marginTop: 24
    
  },
  NumericInput: {
    marginTop: 48
    
  },
  DateTimeInput: {
    marginTop: 24

  }
});