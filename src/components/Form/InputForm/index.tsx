import React from "react";
import { TextInputProps } from "react-native";
import { Container } from "./styles";
import { Input } from "../Input";
import { Control, Controller } from "react-hook-form";

type Props = TextInputProps & {
  control: Control;
  name: string;
};

export function InputForm({ control, name, ...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onchange, value } }) => (
          <Input onChangeText={onchange} value={value} {...rest} />
        )}
        name={name}
      />
    </Container>
  );
}
