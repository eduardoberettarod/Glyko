import { colors } from '@/theme/colors'
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.black }
          }}
          />
        </GestureHandlerRootView>
      </KeyboardProvider>
    </SafeAreaProvider>
  )
}