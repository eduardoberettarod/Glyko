import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { RegisterFlowProvider } from '@/contexts/RegisterFlowContext';

// Layout do fluxo de cadastro, que envolve as telas no RegisterFlowProvider para compartilhar os dados preenchidos entre os passos.
export default function Layout() {
  return (
    <SafeAreaProvider>
      <RegisterFlowProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Slot />
          <StatusBar hidden />
        </GestureHandlerRootView>
      </RegisterFlowProvider>
    </SafeAreaProvider>
  )
}