import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";

const BUTTON_SIZE = 56;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },

  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    overflow: 'hidden',
    borderRadius: BUTTON_SIZE / 2,
    borderWidth: 1,
    borderColor: colors.white,
    shadowColor: colors.translucent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
  },

  blur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  spacer: {
    width: BUTTON_SIZE,
  },

  text: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.hankenGrotesk.bold,
    fontSize: 20,
    textTransform: 'uppercase',
  },
});