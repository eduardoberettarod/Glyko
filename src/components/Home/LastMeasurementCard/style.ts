import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
  container: {
    padding: 18,
    gap: 12
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  left: {
    flexDirection: 'column',
  },
  containerTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8
  },
  title: {
    color: colors.gray[600],
    fontSize: 14,
    fontWeight: 700
  },
  subtitle: {
    color: colors.gray[600],
    paddingTop: 4
  },
  measure: {
    color: colors.gray[600],
    fontSize: 18
  },
  glucose: {
    fontSize: 76,
    color: colors.white,
    fontWeight: 700
  }
});