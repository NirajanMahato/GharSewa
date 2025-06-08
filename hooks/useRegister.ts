import { UserProfile } from "@/types";
import axios from "axios";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

interface RegisterResponse {
  user: UserProfile;
  token?: string;
}

export const useRegister = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const registerUser = async ({
    fullName,
    email,
    phone,
    password,
  }: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    if (!fullName || !email || !phone || !password) {
      Alert.alert("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;

      const response = await axios.post<RegisterResponse>(
        `${baseURL}/api/user/register/customer`,
        {
          fullName,
          email,
          phone,
          password,
        }
      );

      const data = response.data;
      const userId = data.user._id;

      router.push({
        pathname: "/registerStepTwo",
        params: { userId }, // Pass it through router
      });

      return true;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      Alert.alert(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading };
};
