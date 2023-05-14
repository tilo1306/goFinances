import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Container = styled(RectButton)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  padding: 18px;
  width: 100%;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.medium};
  `}
  font-size: ${RFValue(14)}px;
`;
