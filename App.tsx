import React from "react";
import theme from "@global/styles/theme";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { AuthProvider, useAuth } from "./src/hooks/auth";

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

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { userStorageLoading } = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" translucent />
      <AuthProvider>
        {!fontsLoaded && userStorageLoading ? <Loading /> : <Routes />}
      </AuthProvider>
    </ThemeProvider>
  );
}
