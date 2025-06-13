import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useState } from "react";

export const useFetchUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;
        const storedUser = await AsyncStorage.getItem("user");
        const parsed = storedUser ? JSON.parse(storedUser) : null;
        const token = parsed?.token;

        if (!token) return;

        const res = await axios.get(`${baseURL}/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};
