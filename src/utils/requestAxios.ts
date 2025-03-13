import useAsyncStorage from "@/hooks/useSyncStorage";
import axios from "axios";

export default function AxiosHTTP() {
  const API_URL = process.env.EXPO_PUBLIC_URBANIFY_API;
  const XANO_EXTEND = process.env.EXPO_PUBLIC_XANO_LOGIN || "";
  const { getTokens } = useAsyncStorage();

  const Login = async (data: any) => {
    try {
      console.log(`${API_URL}${XANO_EXTEND}/user/login`);
      return await axios.post(`${API_URL}${XANO_EXTEND}/user/login`, data, {
        headers: {
          Accept: "application/json", // Aceitar resposta em JSON
          "Content-Type": "application/json", // Tipo de conteúdo para envio de arquivo
        },
      });
    } catch (err) {
      console.error("[LOGIN]: ", err);
    }
  };

  const POST = async (url: string, data: any) => {
    const { accessToken } = await getTokens();
    try {
      if (!accessToken) throw Error("Token nao encontrado");
      return await axios.post(`${API_URL}${url}`, data, {
        headers: {
          Accept: "application/json", // Aceitar resposta em JSON
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json", // Tipo de conteúdo para envio de arquivo
        },
      });
    } catch (err) {
      console.error("[AXIOS]: ", err);
      return null;
    }
  };

  const POST_FormData = async (complement: string, data: any) => {
    const { accessToken } = await getTokens();
    try {
      if (!accessToken) throw Error("Token nao encontrado");
      return await axios.post(`${API_URL}${complement}`, data, {
        headers: {
          Accept: "application/json", // Aceitar resposta em JSON
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data", // Tipo de conteúdo para envio de arquivo
        },
      });
    } catch (err) {
      console.error("[AXIOS]: ", err);
      return null;
    }
  };

  const GET = async (complement: string) => {
    const { accessToken } = await getTokens();
    try {
      if (!accessToken) throw Error("Token nao encontrado");
      return await axios.get(`${API_URL}${complement}`, {
        headers: {
          Accept: "application/json", // Aceitar resposta em JSON
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json", // Tipo de conteúdo para envio de arquivo
        },
      });
    } catch (err) {
      console.error("[AXIOS]: ", err);
      return null;
    }
  };

  return { POST, POST_FormData, GET, Login };
}
