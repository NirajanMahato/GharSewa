import { colors, fonts } from "@/constants/theme";
import { AuthContext } from "@/context/AuthContext";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const API_URL = "http://localhost:5000/api/bookings/income";

const Income = () => {
  const { token } = useContext(AuthContext) as any;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [payouts, setPayouts] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.resolve(
      axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } })
    )
      .then((res) => {
        setTotal((res as any).data.totalEarnings);
        setMonthly((res as any).data.monthlyEarnings);
        setPayouts((res as any).data.payouts);
      })
      .catch(() => setError("Failed to load income data."))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginTop: 40 }}
          />
        ) : error ? (
          <Text
            style={{ color: "#dc2626", textAlign: "center", marginTop: 40 }}
          >
            {error}
          </Text>
        ) : (
          <>
            <View style={styles.summaryCard}>
              <FontAwesome5 name="wallet" size={26} color={colors.primary} />
              <Text style={styles.totalLabel}>Total Earnings</Text>
              <Text style={styles.totalAmount}>
                NPR {total.toLocaleString()}
              </Text>
            </View>
            {/* Monthly Overview */}
            <View style={styles.monthCard}>
              <Ionicons name="calendar" size={22} color={colors.primary} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.monthLabel}>June Earnings</Text>
                <Text style={styles.monthAmount}>
                  NPR {monthly.toLocaleString()}
                </Text>
              </View>
            </View>
            {/* Recent Payouts */}
            <Text style={styles.sectionTitle}>Recent Payouts</Text>
            {payouts.map((item) => (
              <View key={item.id} style={styles.payoutItem}>
                <Text style={styles.payoutDate}>
                  {new Date(item.date).toLocaleDateString()}
                </Text>
                <Text style={styles.payoutAmount}>
                  NPR {item.amount.toLocaleString()}
                </Text>
              </View>
            ))}
            {payouts.length === 0 && (
              <Text style={styles.noData}>No payout history available.</Text>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Income;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  summaryCard: {
    backgroundColor: "#EEF4FF",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 20,
    marginBottom: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  totalLabel: {
    fontSize: 15,
    color: colors.neutral600,
    marginTop: 12,
    fontFamily: fonts.medium,
  },
  totalAmount: {
    fontSize: 30,
    color: colors.textPrimary,
    fontWeight: "700",
    marginTop: 4,
  },
  monthCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 28,
  },
  monthLabel: {
    fontSize: 15,
    color: colors.neutral600,
    fontFamily: fonts.medium,
  },
  monthAmount: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 14,
  },
  payoutItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.neutral100,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  payoutDate: {
    fontSize: 14,
    color: colors.neutral600,
    fontFamily: fonts.regular,
  },
  payoutAmount: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  noData: {
    textAlign: "center",
    color: colors.neutral500,
    fontSize: 14,
    marginTop: 30,
  },
});
