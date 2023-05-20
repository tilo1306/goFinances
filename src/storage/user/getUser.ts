import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_COLLECTION } from "@storage/storageConfig";
import { IUser } from "./userLogged";

export async function getUser() {
  try {
    const storage = await AsyncStorage.getItem(USER_COLLECTION);

    const user: IUser = storage ? JSON.parse(storage) : ({} as IUser);

    return user;
  } catch (error) {
    throw error;
  }
}
