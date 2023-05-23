/* eslint-disable react-native/no-inline-styles */
import React from "react";
import "react-native-gesture-handler";
import theme from "@global/styles/theme";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { AuthProvider } from "./src/hooks/auth";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { ThemeProvider } from "styled-components/native";
import { Loading } from "@components/Loading";
import { Routes } from "./src/routes";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <AuthProvider>{!fontsLoaded ? <Loading /> : <Routes />}</AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
