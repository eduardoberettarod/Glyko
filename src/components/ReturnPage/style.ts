import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";

export const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.white,
    shadowColor: colors.translucent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
  },
  blur: {
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',

  },
  left: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.bold,
    fontSize: 20,
    textTransform: 'uppercase',
  }
});