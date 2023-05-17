interface ICategory {
  name: string;
  icon: string;
}

export interface ITransaction {
  id: string;
  type: "positive" | "negative";
  title: string;
  amount: string;
  category: ICategory;
  date: string;
}
