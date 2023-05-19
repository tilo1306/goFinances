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
    icon: "Icon",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const formControll = control as unknown as Control<FieldValues, any>;

  function handleTransactionTypeSelect(type: "positive" | "negative") {
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
      type: transactionType === "positive" ? "positive" : "negative",
      category: { key: category.key, name: category.name, icon: category.icon },
    };
    try {
      await createTransaction(data);
      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
        icon: "Icon",
      });
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
                isActive={transactionType === "positive"}
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect("positive")}
              />
              <TransactionTypeButton
                isActive={transactionType === "negative"}
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect("negative")}
              />
            </TransactionTypes>
            <CategorySelectButton
              title={category.name}
              onPress={() => handleOpenSelectCategoryModal()}
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
