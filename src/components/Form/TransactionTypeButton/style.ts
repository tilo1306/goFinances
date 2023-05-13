import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface IIconProps {
  type: "up" | "down";
}
interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}
export const Container = styled(TouchableOpacity)<ContainerProps>`
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
  align-items: center;
  border-radius: 5px;
  flex-direction: row;
  justify-content: center;
  padding: 16px;
  width: 48%;
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
