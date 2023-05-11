import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  height: ${RFPercentage(42)}px;
  width: 100%;
`;

export const UserWrapper = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 24px;
  width: 100%;
`;

export const UserInfo = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  width: ${RFValue(48)}px;

  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Username = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;