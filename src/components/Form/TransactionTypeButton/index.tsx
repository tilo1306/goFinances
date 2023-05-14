import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Icon, Title, Button } from "./style";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};
type Props = RectButtonProps & {
  title: string;
  type: "up" | "down";
  isActive: boolean;
};

export function TransactionTypeButton({
  isActive,
  title,
  type,
  ...rest
}: Props) {
  return (
    <Container type={type} isActive={isActive}>
      <Button {...rest}>
        <Icon type={type} name={icons[type]} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
