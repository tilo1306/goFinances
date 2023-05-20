import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_COLLECTION } from "@storage/storageConfig";

export interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

export async function userLogged(user: IUser) {
  try {
    const storage = JSON.stringify(user);
    await AsyncStorage.setItem(USER_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
