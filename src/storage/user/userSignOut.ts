import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_COLLECTION } from "@storage/storageConfig";

export async function userSignOut() {
  try {
    await AsyncStorage.removeItem(USER_COLLECTION);
  } catch (error) {
    throw error;
  }
}
