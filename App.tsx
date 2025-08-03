import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootStackNavigator from "./src/navigation/RootStackNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content"/>
        <RootStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
