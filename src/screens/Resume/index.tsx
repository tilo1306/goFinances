import React, { useCallback, useState } from "react";
import { Container, Header, Title, Content } from "./styles";
import { HistoryCard } from "@components/HistoryCard";
import { transactionsGetAll } from "@storage/transaction/transactionsGetAll";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { categories } from "@utils/categories";
import { Loading } from "@components/Loading";

interface ICategoryData {
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>(
    []
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchTransactions() {
    try {
      setIsLoading(true);
      const data = await transactionsGetAll();

      const expensives = data.filter(
        (transaction) => transaction.type === "negative"
      );

      const totalByCategory: ICategoryData[] = [];

      categories.forEach((category) => {
        let categorySum = 0;

        expensives.forEach((transaction) => {
          if (transaction.category.key === category.key) {
            categorySum += Number(transaction.amount);
          }
        });

        if (categorySum > 0) {
          const total = categorySum.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });
          totalByCategory.push({
            name: category.name,
            color: category.color,
            total,
          });
        }
        setTotalByCategories(totalByCategory);
      });

      setIsLoading(false);
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
        <Title>Resumo por categoria</Title>
      </Header>
      <Content>
        {isLoading ? (
          <Loading />
        ) : (
          totalByCategories.map((item) => (
            <HistoryCard
              key={item.name}
              title={item.name}
              amount={item.total}
              color={item.color}
            />
          ))
        )}
      </Content>
    </Container>
  );
}
