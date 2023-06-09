import React from "react";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";
import { ITransaction } from "src/type";

interface ICategory {
  name: string;
  icon: string;
}

export interface ITransactionCardProps {
  type: "positive" | "negative";
  title: string;
  amount: string;
  category: ICategory;
  date: string;
}

interface IProps {
  data: ITransaction;
}

export function TransactionCard({ data }: IProps) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
