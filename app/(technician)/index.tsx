import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { AuthContext } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import io from "socket.io-client";

const TechnicianDashboard = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext) || {};
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
    setupSocket();
  }, []);

  const setupSocket = () => {
    if (!user) return;

    const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;
    const socket = io(baseURL);

    socket.emit("join", user.id);

    socket.on("new_booking", (data) => {
      Toast.show({
        type: "success",
        text1: "New Booking!",
        text2: data.message,
      });
      fetchBookings(); // Refresh the list
    });

    return () => {
      socket.disconnect();
    };
  };

  const fetchBookings = async () => {
    if (!user) return;

    try {
      const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;
      const response = await fetch(
        `${baseURL}/api/bookings/technician/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      setRequests(data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (bookingId: string) => {
    try {
      const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;
      const response = await fetch(
        `${baseURL}/api/bookings/${bookingId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ status: "rejected" }),
        }
      );

      if (response.ok) {
        setRequests((prev) => prev.filter((r) => r._id !== bookingId));
        Toast.show({
          type: "success",
          text1: "Booking rejected",
        });
      }
    } catch (error) {
      console.error("Error rejecting booking:", error);
      Toast.show({
        type: "error",
        text1: "Failed to reject booking",
      });
    }
  };

  const handleAccept = async (booking: any) => {
    try {
      const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;
      const response = await fetch(
        `${baseURL}/api/bookings/${booking._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ status: "accepted" }),
        }
      );

      if (response.ok) {
        router.push({
          pathname: "/(tehcnicianPages)/service_details",
          params: {
            bookingId: booking._id,
            customer: booking.customer?.fullName || "Customer",
            serviceType: booking.serviceType,
            problemType: booking.description || "Service Request",
            address: booking.address,
          },
        });
      }
    } catch (error) {
      console.error("Error accepting booking:", error);
      Toast.show({
        type: "error",
        text1: "Failed to accept booking",
      });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    return timeString.substring(0, 5); // Format HH:MM
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.appbar}>
        <Typo size={25} fontWeight="700" style={styles.appbarTitle}>
          Booking Requests
        </Typo>
        <TouchableOpacity onPress={() => router.push("/(technician)/settings")}>
          <Ionicons
            name="settings-outline"
            size={30}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <Text style={styles.noRequests}>Loading...</Text>
        ) : requests.length > 0 ? (
          requests.map((req) => (
            <View key={req._id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Typo fontWeight="700" size={15}>
                  {req.customer?.fullName || "New Booking Request"}
                </Typo>
                <Text style={styles.timeText}>
                  {req.scheduledDate && formatDate(req.scheduledDate)}
                  {req.scheduledTime && ` at ${formatTime(req.scheduledTime)}`}
                </Text>
              </View>
              <Text style={styles.problemText}>Service: {req.serviceType}</Text>
              {req.problemType && (
                <Text style={styles.problemText}>
                  Problem: {req.problemType}
                </Text>
              )}
              {req.customProblem && (
                <Text style={styles.problemText}>
                  Details: {req.customProblem}
                </Text>
              )}
              <Text style={styles.problemText}>Address: {req.address}</Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <TouchableOpacity
                  style={[
                    styles.actionBtn,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={() => handleAccept(req)}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Accept
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.actionBtn,
                    { backgroundColor: colors.neutral300, marginLeft: 10 },
                  ]}
                  onPress={() => handleReject(req._id)}
                >
                  <Text
                    style={{ color: colors.textPrimary, fontWeight: "bold" }}
                  >
                    Reject
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noRequests}>
            No booking requests at the moment
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TechnicianDashboard;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  appbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral200,
  },
  appbarTitle: {
    color: colors.textPrimary,
    fontFamily: fonts.bold,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  card: {
    backgroundColor: colors.neutral100,
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  timeText: {
    fontSize: 12,
    color: colors.neutral500,
    fontFamily: fonts.regular,
  },
  locationText: {
    fontSize: 14,
    color: colors.neutral600,
    marginBottom: 4,
    fontFamily: fonts.medium,
  },
  problemText: {
    fontSize: 15,
    color: colors.textPrimary,
    fontFamily: fonts.regular,
  },
  noRequests: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 14,
    color: colors.neutral500,
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
