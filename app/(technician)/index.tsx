import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DUMMY_REQUEST = {
  _id: "dummy-booking-1",
  customer: {
    fullName: "Nirajan Mahato",
    address: "Kathmandu, Nepal",
  },
  serviceType: "Plumbing",
  problemType: "Leaking Pipe",
  address: "Kathmandu, Nepal",
};

const TechnicianDashboard = () => {
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([DUMMY_REQUEST]);

  // Reset requests on mount (simulate fresh login)
  useEffect(() => {
    setRequests([DUMMY_REQUEST]);
  }, []);

  const handleReject = (bookingId: string) => {
    setRequests((prev) => prev.filter((r) => r._id !== bookingId));
  };

  const handleAccept = (booking: any) => {
    router.push({
      pathname: "/(tehcnicianPages)/service_details",
      params: {
        bookingId: booking._id,
        customer: booking.customer.fullName,
        serviceType: booking.serviceType,
        problemType: booking.problemType,
        address: booking.address,
      },
    });
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
          <View key={req._id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Typo fontWeight="700" size={15}>
                {req.customer?.fullName || "New Booking Request"}
              </Typo>
            </View>
            <Text style={styles.problemText}>Service: {req.serviceType}</Text>
            <Text style={styles.problemText}>Problem: {req.problemType}</Text>
            <Text style={styles.problemText}>
              Address: {req.address || req.customer?.address}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: colors.primary }]}
                onPress={() => handleAccept(req)}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Start Service
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  { backgroundColor: colors.neutral300, marginLeft: 10 },
                ]}
                onPress={() => handleReject(req._id)}
              >
                <Text style={{ color: colors.textPrimary, fontWeight: "bold" }}>
                  Dismiss
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
