import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import requestAxios from "@/utils/requestAxios";
import Toast from "react-native-toast-message";
import { jwtDecode, JwtPayload } from "jwt-decode";
import useAsyncStorage from "./useSyncStorage";

export default function useAuth() {
  const [email, setEmail] = useState<string>("admin@admin.com");
  const [password, setPassword] = useState<string>("admin123");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorEmailOrPassword, setErrorEmailOrPassword] =
    useState<boolean>(false);
  const { Login } = requestAxios();
  const { setRole, setTokens } = useAsyncStorage();

  const signIn = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }
    setLoading(true);
    setErrorEmailOrPassword(false);
    try {
      const response = await Login({ email, password });
      const { accessToken, refreshToken } = response?.data;
      console.log(response);
      if (!response) return;
      // 🔹 Salva o token no SecureStore
      if (!accessToken) throw new Error("Token not found");
      try {
        const { role }: any = jwtDecode(accessToken);
        await setRole(role);
      } catch (err) {
        console.log("Erro ao extrair role do Token: ", err);
        alert("Erro:" + err);
      }
      await setTokens(accessToken, refreshToken);
      setErrorEmailOrPassword(false);
      router.navigate("/(auth)");
    } catch (err) {
      console.error("Error: ", err);
      setLoading(false);
      setErrorEmailOrPassword(true);
      Toast.show({
        visibilityTime: 5000,
        autoHide: true,
        text1: "LOGIN",
        text2: `Erro login: ${err}`,
        type: "error",
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    signIn,
    errorEmailOrPassword,
  };
}
