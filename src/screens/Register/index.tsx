import React, { useState } from "react";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";
import { Input } from "@components/Form/Input";
import { Button } from "@components/Form/Button";
import { TransactionTypeButton } from "@components/Form/TransactionTypeButton";

export function Register() {
  const [transactionType, setTransactionType] = useState("");

  function handlesetTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadrastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionTypes>
            <TransactionTypeButton
              isActive={transactionType === "up"}
              type="up"
              title="Income"
              onPress={() => handlesetTransactionTypeSelect("up")}
            />
            <TransactionTypeButton
              isActive={transactionType === "down"}
              type="down"
              title="Outcome"
              onPress={() => handlesetTransactionTypeSelect("down")}
            />
          </TransactionTypes>
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
