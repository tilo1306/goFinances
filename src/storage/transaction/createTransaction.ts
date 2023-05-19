import AsyncStorage from "@react-native-async-storage/async-storage";

import { transactionsGetAll } from "./transactionsGetAll";

import { TRANSACTION_COLLECTION } from "@storage/storageConfig";
import { ITransaction } from "src/type";

export async function createTransaction(data: ITransaction) {
  try {
    const storeTransactions = await transactionsGetAll();

    const amount = Number(data.amount).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    const date = Intl.DateTimeFormat("pt-br", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(new Date());

    const newTransaction: ITransaction = {
      id: data.id,
      title: data.title,
      amount,
      type: data.type,
      category: data.category,
      date,
    };

    const storage = JSON.stringify([...storeTransactions, newTransaction]);
    await AsyncStorage.setItem(TRANSACTION_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
