import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NAVBAR_HEIGHT = 100;

type Props = {
  children: ReactNode;
  style?: ViewStyle;
  nav?: boolean;
  overlay?: ReactNode;
};

export default function Scroll({
  children,
  style = {},
  nav = false,
  overlay,
}: Props) {

  const insets = useSafeAreaInsets();

  const paddingBottom = nav
    ? NAVBAR_HEIGHT + insets.bottom
    : insets.bottom + 150;

  return (
    <View style={{ flex: 1 }}>

      <StatusBar style="light" />

      <KeyboardAwareScrollView
        bottomOffset={30}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {
            flex: 0,
            flexGrow: 1,
            paddingTop: insets.top + 10,
            paddingBottom,
          },
        ]}
      >
        <View
          style={[
            style,
            {
              flex: 0,
              flexGrow: 1,
              width: '100%',
            },
          ]}
        >
          {children}
        </View>
      </KeyboardAwareScrollView>

      {/* FICA AQUI */}
      {overlay && (
        <View
          style={{
            position: 'absolute',
            top: insets.top + 30,
            left: 0,
            right: 0,
            zIndex: 999,
            elevation: 10,
            paddingHorizontal: 18
          }}
        >
          {overlay}
        </View>
      )}

    </View>
  );
}