import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  normalBorder: {
    borderColor: colors.green[600],
    backgroundColor: colors.status.normalBackground
  },
  
  highBorder: {
    borderColor: colors.red[600],
    backgroundColor: colors.status.highBackground
  },
  
  lowBorder: {
    borderColor: colors.blue[500],
    backgroundColor: colors.status.lowBackground
  },
  normal: {
    color: colors.green[600],
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.3
  },
  low: {
    color: colors.blue[500],
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.3
  },
  high: {
    color: colors.red[600],
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.3
  }
});