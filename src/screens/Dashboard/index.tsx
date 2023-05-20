import React, { useCallback, useState } from "react";

import { HighlightCard } from "@components/HighlightCard";
import { ITransaction } from "../../type";

import { TransactionCard } from "@components/TransactionCard";

import {
  Container,
  Header,
  Icon,
  LogoutButton,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserWrapper,
  Username,
  HighlightCards,
  Transactions,
  TransactionList,
  Title,
} from "./styles";
import { transactionsGetAll } from "@storage/transaction/transactionsGetAll";
import { Alert } from "react-native";
import { Loading } from "@components/Loading";
import { useFocusEffect } from "@react-navigation/native";
import { calculate } from "../../helper";
import { useAuth } from "src/hooks/auth";

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HightlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function DashBoard() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [highlightData, setHighlightData] = useState<HightlightData>({
    entries: { amount: "R$ 0", lastTransaction: "" },
    expensives: { amount: "R$ 0", lastTransaction: "" },
    total: { amount: "R$ 0", lastTransaction: "" },
  });

  const { signOut, user } = useAuth();

  async function fetchTransactions() {
    try {
      setIsLoading(true);
      const data = await transactionsGetAll();

      const valuesTransaction = calculate(data);

      setIsLoading(false);

      setHighlightData(valuesTransaction as HightlightData);

      setTransactions(data);
    } catch (error) {
      Alert.alert("Transações", "Não foi possivel carregar as transações!");
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [])
  );

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: user.photo,
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <Username>{user.name}</Username>
            </User>
          </UserInfo>
          <LogoutButton onPress={signOut}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount={highlightData.entries.amount}
          lastTransaction={highlightData.entries.lastTransaction}
        />
        <HighlightCard
          type="down"
          title="Saída"
          amount={highlightData.expensives.amount}
          lastTransaction={highlightData.expensives.lastTransaction}
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction={highlightData.total.lastTransaction}
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        {isLoading ? (
          <Loading />
        ) : (
          <TransactionList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TransactionCard data={item} />}
          />
        )}
      </Transactions>
    </Container>
  );
}
