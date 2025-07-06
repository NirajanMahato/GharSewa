import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import Constants from "expo-constants";
import { useContext, useEffect, useState } from "react";

interface Booking {
  _id: string;
  serviceType: string;
  status: string;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  estimatedCost: number;
  technician?: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    companyName?: string;
  };
  customer?: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
  };
  createdAt: string;
}

interface UseUserBookingsReturn {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useUserBookings = (): UseUserBookingsReturn => {
  const authContext = useContext(AuthContext);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    if (!authContext?.user?.id) {
      setError("User not authenticated");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;

      const response = await axios.get<{ bookings: Booking[]; total: number }>(
        `${baseURL}/api/bookings/customer/${authContext.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${authContext.user.token}`,
          },
        }
      );

      setBookings(response.data.bookings || []);
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to fetch bookings";
      setError(message);
      console.error("Fetch bookings error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [authContext?.user?.id]);

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings,
  };
};
