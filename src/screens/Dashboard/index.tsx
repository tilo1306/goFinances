import React from "react";

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
} from "./styles";

export function DashBoard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: www }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <Username>Douglas</Username>
            </User>
          </UserInfo>
          <Icon />
        </UserWrapper>
      </Header>
    </Container>
  );
}
