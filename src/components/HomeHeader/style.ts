import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  image: {

  },
  title: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 700
  },
  label: {
    fontSize: 12,
    color: colors.white
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.translucent
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  right: {

  },
  notification: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.translucent
  }
});