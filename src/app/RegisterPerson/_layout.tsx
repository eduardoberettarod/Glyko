import { Slot, usePathname } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import PaginationIndicator from '@/components/Paginationindicator';

const REGISTER_STEPS = ['/RegisterPerson', '/RegisterPerson/diabetes'];

function PersistentPagination() {
  const pathname = usePathname();
  const activeIndex = REGISTER_STEPS.indexOf(pathname);

  return (
    <PaginationIndicator
      total={REGISTER_STEPS.length}
      activeIndex={activeIndex}
      style={{
        position: 'absolute',
        right: '50%',
        transform: [{ translateX: '50%' }],
        bottom: 130,
        alignItems: 'center'
      }}
    />
  );
}

export default function Layout() {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Slot />
          <PersistentPagination />
          <StatusBar hidden />
        </GestureHandlerRootView>
      </KeyboardProvider>
    </SafeAreaProvider>
  )
}