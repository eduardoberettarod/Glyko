import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.green[600],
  },
  status: {
    color: colors.green[600],
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.3
  }
});