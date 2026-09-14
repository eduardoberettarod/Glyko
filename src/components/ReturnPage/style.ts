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