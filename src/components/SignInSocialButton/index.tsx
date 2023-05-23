import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Button, ImagemContainer, Text } from "./styles";
import { SvgProps } from "react-native-svg";

type Props = RectButtonProps & {
  title: string;
  svg: React.FC<SvgProps>;
};

export function SignInSocialButton({ title, svg: Svg, ...rest }: Props) {
  return (
    <Button {...rest}>
      <ImagemContainer>
        <Svg />
      </ImagemContainer>
      <Text>{title}</Text>
    </Button>
  );
}
