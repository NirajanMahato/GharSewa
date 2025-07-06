import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import Constants from "expo-constants";
import { useContext, useState } from "react";

interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
}

export const useChangePassword = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const changePassword = async ({
    currentPassword,
    newPassword,
  }: ChangePasswordParams) => {
    if (!currentPassword || !newPassword) {
      throw new Error("Current password and new password are required.");
    }

    if (newPassword.length < 6) {
      throw new Error("New password must be at least 6 characters long.");
    }

    if (!authContext?.user?.token) {
      throw new Error("User not authenticated.");
    }

    try {
      setLoading(true);
      const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;

      const response = await axios.put(
        `${baseURL}/api/user/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${authContext.user.token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to change password";
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading };
};
