import React from "react";
import theme from "@global/styles/theme";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { ThemeProvider } from "styled-components/native";
import { DashBoard } from "@screens/Dashboard";
import { Loading } from "@components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  return (
    <ThemeProvider theme={theme}>
      {!fontsLoaded ? <Loading /> : <DashBoard />}
    </ThemeProvider>
  );
}
