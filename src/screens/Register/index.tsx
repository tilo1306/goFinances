import React, { useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldValues, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import uuid from "uuid-js";

import { Button } from "@components/Form/Button";
import { TransactionTypeButton } from "@components/Form/TransactionTypeButton";
import { CategorySelectButton } from "@components/Form/CategorySelectButton";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";
import { CategorySelect } from "@screens/CategorySelect";
import { InputForm } from "@components/Form/InputForm";
import { createTransaction } from "@storage/transaction/createTransaction";
import { ITransaction } from "src/type";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório!"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pose ser negativo")
    .required("O valor é obrigatorio"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { navigate } = useNavigation();

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const formControll = control as unknown as Control<FieldValues, any>;

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo da transação");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione a categoria");
    }
    const data: ITransaction = {
      id: uuid.create().toString(),
      title: form.name,
      amount: form.amount,
      type: transactionType === "up" ? "positive" : "negative",
      category: { name: category.name, icon: category.key },
      date: new Date().toISOString(),
    };
    try {
      await createTransaction(data);
      navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel salvar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadrastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={formControll}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors?.name.message}
            />
            <InputForm
              name="amount"
              control={formControll}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors?.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                isActive={transactionType === "up"}
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect("up")}
              />
              <TransactionTypeButton
                isActive={transactionType === "down"}
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect("down")}
              />
            </TransactionTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button
            title="Enviar"
            onPress={() => handleSubmit(handleRegister)()}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
