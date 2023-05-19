import React from "react";
import { Container, Title, Amount } from "./styles";

interface IProps {
  title: string;
  amount: string;
  color: string;
}

export function HistoryCard({ amount, color, title }: IProps) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
