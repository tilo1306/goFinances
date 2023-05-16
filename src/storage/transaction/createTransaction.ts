import AsyncStorage from "@react-native-async-storage/async-storage";

import { transactionsGetAll } from "./transactionsGetAll";

import { TRANSACTION_COLLECTION } from "@storage/storageConfig";
import { ITransaction } from "src/type";

export async function createTransaction(date: ITransaction) {
  try {
    const storeTransactions = await transactionsGetAll();

    const storage = JSON.stringify([...storeTransactions, date]);
    await AsyncStorage.setItem(TRANSACTION_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
