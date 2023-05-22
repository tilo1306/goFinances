import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRANSACTION_COLLECTION } from "@storage/storageConfig";
import { ITransaction } from "src/type";

export async function transactionsGetAll(userId: string) {
  try {
    const storage = await AsyncStorage.getItem(TRANSACTION_COLLECTION);

    if (storage) {
      const listStorage: ITransaction[] = JSON.parse(storage);
      const findTransactionsUser = listStorage.filter(
        (transaction) => transaction.userId === userId
      );
      return findTransactionsUser;
    }

    return [];
  } catch (error) {
    throw error;
  }
}
