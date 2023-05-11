import React from "react";
import {} from "@expo/vector-icons";

import {
  Container,
  Header,
  Icon,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserWrapper,
  Username,
  HighlightCards,
} from "./styles";
import { HighlightCard } from "@components/HighlightCard";

export function DashBoard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/49030804?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <Username>Douglas</Username>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última  entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saída"
          amount="R$ 1.259,00"
          lastTransaction="Última  saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 á 16 de abril"
        />
      </HighlightCards>
    </Container>
  );
}
