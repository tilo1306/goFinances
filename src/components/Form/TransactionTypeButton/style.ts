import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface IIconProps {
  type: "up" | "down";
}
interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}
export const Container = styled.View<ContainerProps>`
  ${({ isActive, type }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${({ theme }) => theme.colors.sucess_light};
    `}

  ${({ isActive, type }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}
    
  border-color: ${({ theme }) => theme.colors.text};
  border-style: solid;
  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-radius: 5px;
  width: 48%;
`;

export const Button = styled(RectButton)`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 16px;
`;

export const Icon = styled(Feather)<IIconProps>`
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.sucess : theme.colors.attention};
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
