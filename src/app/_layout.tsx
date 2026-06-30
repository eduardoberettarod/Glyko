import { View } from "react-native";
import { Stack } from "expo-router";

import { colors } from "@/theme/colors";

export default function Layout() {
  return (

    <View style={{ flex: 1, backgroundColor: colors.black }}>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.black }
      }} />
    </View>

  )
}