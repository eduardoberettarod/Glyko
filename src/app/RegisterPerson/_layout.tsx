import { colors } from '@/theme/colors'
import { Stack, usePathname } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import PaginationIndicator from '@/components/Paginationindicator';
import { RegisterFlowProvider, useRegisterFlow } from '@/context/RegisterFlowContext';

const REGISTER_STEPS = ['/RegisterPerson', '/RegisterPerson/diabetes'];

function PersistentPagination() {
  const pathname = usePathname();
  const { footerTop } = useRegisterFlow();
  const activeIndex = REGISTER_STEPS.indexOf(pathname);

  if (activeIndex === -1 || footerTop === null) return null;

  return (
    <PaginationIndicator
      total={REGISTER_STEPS.length}
      activeIndex={activeIndex}
      style={{
        position: 'absolute',
        right: '50%',
        transform: [{ translateX: '50%' }],
        top: footerTop,
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
          <RegisterFlowProvider>
            <Stack screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.black }
            }}
            />
            <PersistentPagination />
          </RegisterFlowProvider>
          <StatusBar hidden />
        </GestureHandlerRootView>
      </KeyboardProvider>
    </SafeAreaProvider>
  )
}