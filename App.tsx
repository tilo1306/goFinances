import React from "react";
import AppLoading from "expo-app-loading";
import theme from "src/global/styles/theme";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { ThemeProvider } from "styled-components/native";
import { DashBoard } from "@screens/Dashboard";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  return (
    <ThemeProvider theme={theme}>
      {!fontsLoaded ? <AppLoading /> : <DashBoard />}
    </ThemeProvider>
  );
}
