import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { AuthContext } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
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
import io from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // Change to your backend URL if needed
const API_URL = "http://localhost:5000/api/bookings";
const socket = io(SOCKET_URL);

const TechnicianDashboard = () => {
  const router = useRouter();
  const { user, token } = useContext(AuthContext) as any;
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    socket.emit("join", user.id); // Join personal room
    socket.on("booking_request", async (payload) => {
      // payload: { bookingId }
      try {
        const res = await axios.get(`${API_URL}/${payload.bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests((prev) => [...prev, res.data]);
      } catch (err) {
        // fallback: just add bookingId
        setRequests((prev) => [...prev, { _id: payload.bookingId }]);
      }
    });
    return () => {
      socket.off("booking_request");
    };
  }, [user, token]);

  const handleResponse = (bookingId: string, response: "accept" | "reject") => {
    if (!user) return;
    socket.emit("booking_response", {
      bookingId,
      technicianId: user.id,
      response,
    });
    setRequests((prev) =>
      prev.filter((r) => r._id !== bookingId && r.bookingId !== bookingId)
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.appbar}>
        <Typo size={25} fontWeight="700" style={styles.appbarTitle}>
          Requests
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
        {requests.map((req) => (
          <View key={req._id || req.bookingId} style={styles.card}>
            <View style={styles.cardHeader}>
              <Typo fontWeight="700" size={15}>
                {req.customer?.fullName || "New Booking Request"}
              </Typo>
            </View>
            <Text style={styles.problemText}>Service: {req.serviceType}</Text>
            <Text style={styles.problemText}>
              Problem: {req.problemType || req.subProblem}
            </Text>
            <Text style={styles.problemText}>
              Address: {req.address || req.customer?.address}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: colors.primary }]}
                onPress={() =>
                  handleResponse(req._id || req.bookingId, "accept")
                }
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
                onPress={() =>
                  handleResponse(req._id || req.bookingId, "reject")
                }
              >
                <Text style={{ color: colors.textPrimary, fontWeight: "bold" }}>
                  Reject
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {requests.length === 0 && (
          <Text style={styles.noRequests}>No requests at the moment</Text>
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
