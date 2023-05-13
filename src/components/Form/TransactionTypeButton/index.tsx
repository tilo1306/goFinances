import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./style";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};
type Props = TouchableOpacityProps & {
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
    <Container type={type} {...rest} isActive={isActive}>
      <Icon type={type} name={icons[type]} />
      <Title>{title}</Title>
    </Container>
  );
}
