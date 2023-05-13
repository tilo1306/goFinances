import styled, { css } from "styled-components/native";

import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
  ${({ theme }) => css`
    background-color: ${theme.colors.shape};
    color: ${theme.colors.text_dark};
    font-family: ${theme.fonts.regular};
  `}

  border-radius: 5px;
  font-size: ${RFValue(14)}px;
  margin-bottom: 8px;
  padding: 16px 18px;
  width: 100%;
`;
