import { colors } from '@/theme/colors'
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/contexts/AuthContext';
import { configurarComportamentoDasNotificacoes } from '@/services/notifications';
import {
  useFonts,
  HankenGrotesk_300Light,
  HankenGrotesk_400Regular,
  HankenGrotesk_500Medium,
  HankenGrotesk_600SemiBold,
  HankenGrotesk_700Bold,
} from "@expo-google-fonts/hanken-grotesk";

// Só precisa ser configurado uma vez, quando o módulo é carregado.
configurarComportamentoDasNotificacoes();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    HankenGrotesk_300Light,
    HankenGrotesk_400Regular,
    HankenGrotesk_500Medium,
    HankenGrotesk_600SemiBold,
    HankenGrotesk_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <KeyboardProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.black }
            }}
            />
            <StatusBar hidden />
          </GestureHandlerRootView>
        </KeyboardProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}