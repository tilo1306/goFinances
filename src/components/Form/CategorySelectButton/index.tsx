import React from "react";
import { Container, Category, Icon } from "./styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface IProps {
  title: String;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: IProps) {
  return (
    <GestureHandlerRootView>
      <Container onPress={onPress}>
        <Category>{title}</Category>

        <Icon name="chevron-down" />
      </Container>
    </GestureHandlerRootView>
  );
}
