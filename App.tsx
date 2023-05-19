import React from "react";
import theme from "@global/styles/theme";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { ThemeProvider } from "styled-components/native";
import { Loading } from "@components/Loading";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "@routes/app.routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {!fontsLoaded ? <Loading /> : <AppRoutes />}
      </NavigationContainer>
    </ThemeProvider>
  );
}
