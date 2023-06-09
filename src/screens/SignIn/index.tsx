import React, { useState } from "react";
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
  Load,
} from "./styles";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";

import LogoSvg from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "@components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import { Alert, Platform } from "react-native";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { sighInWithGoogle, signInWithApple } = useAuth();

  async function handleSighInWithGoogle() {
    try {
      setIsLoading(true);
      await sighInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel conectar a conta Google");
      setIsLoading(false);
    }
  }

  async function handleSighInWithApple() {
    try {
      setIsLoading(true);

      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel conectar a conta Apple");
      setIsLoading(false);
    }
  }
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {"\n"}
            finanças de forma {"\n"}
            muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {"\n"}
          uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entra com Google"
            svg={GoogleSvg}
            onPress={handleSighInWithGoogle}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              title="Entra com Apple"
              svg={AppleSvg}
              onPress={handleSighInWithApple}
            />
          )}
        </FooterWrapper>
        {isLoading && <Load />}
      </Footer>
    </Container>
  );
}
