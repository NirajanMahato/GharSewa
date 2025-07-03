import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useContext, useState } from "react";
import Constants from "expo-constants";

interface LoginResponse {
  message: string;
  user: {
    id: string;
    role: "customer" | "technician" | "admin";
    token: string;
    fullName: string;
    email: string;
    profilePicture?: string;
  };
}

export const useLogin = () => {
  const authContext = useContext(AuthContext);
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

    if (!authContext) {
      throw new Error("Auth context not available.");
    }

    try {
      setLoading(true);
      const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;
      // const baseURL = "http://192.168.1.74:5000"; // For real devices

      const response = await axios.post<LoginResponse>(
        `${baseURL}/api/user/login`,
        {
          email,
          password,
        }
      );

      const { user } = response.data;
      await authContext.login(user);
      console.log("User logged in:", user);
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
