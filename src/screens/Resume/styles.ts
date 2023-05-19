import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};

  height: ${RFValue(113)}px;
  justify-content: flex-end;
  padding-bottom: 19px;
  width: 100%;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.regular};
  `}

  font-size: ${RFValue(18)}px;
`;

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
  align-items: center;
  width: 100%;
`;

export const MonthSelect = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
  width: 100%;
`;

export const MonthSelectButton = styled.TouchableOpacity``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;
