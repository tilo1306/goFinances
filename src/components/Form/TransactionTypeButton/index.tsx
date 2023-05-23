import React from "react";
import { Container, Icon, Title, Button } from "./style";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};
type Props = {
  title: string;
  type: "up" | "down";
  isActive: boolean;
  onPress: () => void;
};

export function TransactionTypeButton({
  isActive,
  title,
  type,
  onPress,
}: Props) {
  return (
    <Container type={type} isActive={isActive}>
      <Button onPress={onPress}>
        <Icon type={type} name={icons[type]} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
