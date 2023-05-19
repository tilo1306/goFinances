/* eslint-disable radix */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from "./styles";
import { HistoryCard } from "@components/HistoryCard";
import { transactionsGetAll } from "@storage/transaction/transactionsGetAll";
import { Alert } from "react-native";
import { categories } from "@utils/categories";
import { Loading } from "@components/Loading";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";

import { useTheme } from "styled-components/native";
import { addMonths, format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFocusEffect } from "@react-navigation/native";

interface ICategoryData {
  color: string;
  name: string;
  total: number;
  totalFormatted: string;
  percent: string;
}

export function Resume() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const theme = useTheme();

  function handleDateChange(action: "next" | "prev") {
    if (action === "next") {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  }

  async function fetchTransactions() {
    try {
      setIsLoading(true);
      const data = await transactionsGetAll();

      const expensives = data.filter((transaction) => {
        const [day, month, year] = transaction.date
          ? transaction.date.split("/")
          : ["", "", ""];
        const formattedYear = `20${year}`;
        const transactionDate = new Date(
          parseInt(formattedYear),
          parseInt(month) - 1,
          parseInt(day)
        );

        return (
          transaction.type === "negative" &&
          transactionDate.getMonth() === selectedDate.getMonth() &&
          transactionDate.getFullYear() === selectedDate.getFullYear()
        );
      });

      const expensivesTotal = expensives.reduce((acc, expensive) => {
        return (
          acc +
          parseFloat(
            expensive.amount
              .replace("R$", "")
              .trim()
              .replace(".", "")
              .replace(",", ".")
          )
        );
      }, 0);

      console.log(expensivesTotal);

      const totalByCategory: ICategoryData[] = [];

      categories.forEach((category) => {
        let categorySum = 0;

        expensives.forEach((transaction) => {
          if (transaction.category.name === category.name) {
            const transactionAmount = parseFloat(
              transaction.amount
                .replace("R$", "")
                .trim()
                .replace(".", "")
                .replace(",", ".")
            );

            categorySum += transactionAmount;
          }
        });

        if (categorySum > 0) {
          const totalFormatted = categorySum.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          console.log(categorySum);
          console.log(expensivesTotal);

          const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
            0
          )}%`;
          totalByCategory.push({
            name: category.name,
            color: category.color,
            total: categorySum,
            totalFormatted,
            percent,
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
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ? (
        <Loading />
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange("prev")}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>
            <Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </Month>
            <MonthSelectButton onPress={() => handleDateChange("next")}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>
          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
              x="percent"
              y="total"
            />
          </ChartContainer>

          {totalByCategories.map((item) => (
            <HistoryCard
              key={item.name}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
}
