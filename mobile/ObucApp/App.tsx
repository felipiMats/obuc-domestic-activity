import { AuthContextProvider } from '@contexts/AuthContext';
import { Routes } from '@routes/index';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "./global.css"

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#8142FF" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthContextProvider>
            <Routes />
          </AuthContextProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
  );
}
