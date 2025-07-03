import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useEffect, useState } from "react";

type TechnicianSearchParams = {
  type: string;
  sub: string;
  location: string;
  searchType: string;
  onSuccess: (bookingId: string) => void;
  onFail?: () => void;
};

export const useTechnicianSearch = ({
  type,
  sub,
  location,
  searchType,
  onSuccess,
  onFail,
}: TechnicianSearchParams) => {
  const [status, setStatus] = useState<"searching" | "found" | "not-found">(
    "searching"
  );

  useEffect(() => {
    const search = async () => {
      try {
        const token = await AsyncStorage.getItem("user").then(
          (res) => res && JSON.parse(res).token
        );
        const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;

        const res = await fetch(`${baseURL}/api/bookings/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ type, sub, location, searchType }),
        });

        const data = await res.json();

        if (data.success) {
          setStatus("found");
          onSuccess(data.bookingId);
        } else {
          setStatus("not-found");
          onFail?.();
        }
      } catch (err) {
        console.error("Search error:", err);
        setStatus("not-found");
        onFail?.();
      }
    };

    search();
  }, [type, sub, location, searchType, onSuccess, onFail]);

  return { status };
};
