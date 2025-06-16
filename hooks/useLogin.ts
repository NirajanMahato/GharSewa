// hooks/useLogin.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useState } from "react";

interface LoginResponse {
  message: string;
  user: {
    id: string;
    role: string;
    token: string;
  };
}

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loginUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (!email || !password) {
      throw new Error("All fields are required.");
    }

    try {
      setLoading(true);
      // const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;
      const baseURL = "http://192.168.1.74:5000"; // For real devices

      const response = await axios.post<LoginResponse>(
        `${baseURL}/api/user/login`,
        {
          email,
          password,
        }
      );

      const { user } = response.data;
      await AsyncStorage.setItem("user", JSON.stringify(user));
      console.log("User logged in:", user);
      router.replace("/(drawer)");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading };
};
