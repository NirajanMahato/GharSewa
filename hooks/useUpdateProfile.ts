import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import Constants from "expo-constants";
import { useContext, useState } from "react";

interface UpdateProfileParams {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
}

export const useUpdateProfile = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const updateProfile = async (params: UpdateProfileParams) => {
    const { fullName, email, phone, address } = params;

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      throw new Error("Full name, email, and phone are required.");
    }

    if (!authContext?.user?.token) {
      throw new Error("User not authenticated.");
    }

    try {
      setLoading(true);
      const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;

      const response = await axios.put<{ message: string; user: any }>(
        `${baseURL}/api/user/profile`,
        {
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address?.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${authContext.user.token}`,
          },
        }
      );

      // Update the user context with new data
      if (authContext.setUser && response.data.user) {
        authContext.setUser({
          ...authContext.user,
          fullName: response.data.user.fullName,
          email: response.data.user.email,
        });
      }

      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update profile";
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading };
};
