import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export default function useAsyncStorage() {
  const secret_token = process.env.EXPO_PUBLIC_URBANIFY_SECRET_TOKEN!;
  const storage_reports = process.env.EXPO_PUBLIC_URBANIFY_STORAGE_REPORTS!;

  const getRole = async () => {
    try {
      return await AsyncStorage.getItem("role");
    } catch (err) {
      console.log("[ROLE]: ", err);
    }
  };

  const setRole = async (role: string) => {
    try {
      await AsyncStorage.setItem("role", role);
    } catch (err) {
      console.log("[ROLE]: ", err);
    }
  };

  const getTokens = async () => {
    try {
      const tokenData = await SecureStore.getItemAsync(secret_token);
      return tokenData ? JSON.parse(tokenData) : null;
    } catch (err) {
      console.error("[TOKEN ERROR]: ", err);
      return null;
    }
  };

  const setTokens = async (accessToken: string, refreshToken: string) => {
    try {
      const tokenData = { accessToken, refreshToken };
      await SecureStore.setItemAsync(secret_token, JSON.stringify(tokenData));
    } catch (err) {
      console.error("[TOKEN ERROR]: ", err);
    }
  };

  return {
    getRole,
    setRole,
    getTokens,
    setTokens,
  };
}
