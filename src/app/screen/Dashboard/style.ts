import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
  },
  header: {
    marginTop: 32
  },
  panel: {
    marginTop: 48,
    marginBottom: 48
  },
  panelText: {
    color: colors.gray[500],
    textTransform: 'uppercase',
    fontFamily: fonts.hankenGrotesk.light,
    fontSize: 14,
    marginBottom: 12
  },
  label: {
    color: colors.gray[400],
    textTransform: 'uppercase',
    fontFamily: fonts.hankenGrotesk.medium

  },
  textChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  chart: {
    marginTop: 24
  }
});