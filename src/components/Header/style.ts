import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 48,
    color: colors.emerald[500],
    fontFamily: fonts.hankenGrotesk.semiBold,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.emerald[500],
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  icon: {
    backgroundColor: colors.emerald[500],
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  }
});