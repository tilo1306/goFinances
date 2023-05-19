import React from "react";
import {
  GestureHandlerRootView,
  RectButtonProps,
} from "react-native-gesture-handler";
import { Container, Title } from "./styles";

type Props = RectButtonProps & {
  title: string;
  onPress: (pointerInside: boolean) => void;
};

export function Button({ title, onPress, ...rest }: Props) {
  return (
    <GestureHandlerRootView>
      <Container onPress={onPress} {...rest}>
        <Title>{title}</Title>
      </Container>
    </GestureHandlerRootView>
  );
}
