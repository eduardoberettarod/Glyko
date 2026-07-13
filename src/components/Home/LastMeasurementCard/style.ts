import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
  container: {

  },
  header: {
    alignItems: 'center',
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
  }
});