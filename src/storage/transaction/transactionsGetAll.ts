import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRANSACTION_COLLECTION } from "@storage/storageConfig";
import { ITransaction } from "src/type";

export async function transactionsGetAll() {
  try {
    const storage = await AsyncStorage.getItem(TRANSACTION_COLLECTION);

    const transactions: ITransaction[] = storage ? JSON.parse(storage) : [];

    return transactions;
  } catch (error) {
    throw error;
  }
}
