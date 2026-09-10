import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { RegisterFlowProvider } from '@/contexts/RegisterFlowContext';

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