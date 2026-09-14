import { View } from "react-native";
import { Stack } from "expo-router";

import { colors } from "@/theme/colors";
import TabBar from "@/components/TabBar";
import { StatusBar } from "expo-status-bar";

// Layout das telas internas do app (Dashboard, Histórico, Perfil, etc.), que adiciona a barra de navegação inferior sobre o Stack.
export default function Layout() {
  return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.black },
            }}
          />
          <StatusBar hidden />
          <TabBar />
        </View>
  );
}