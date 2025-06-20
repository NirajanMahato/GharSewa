import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { colors, fonts } from "@/constants/theme";

const payouts = [
  { id: 1, date: "2024-06-20", amount: 2200 },
  { id: 2, date: "2024-06-12", amount: 1800 },
  { id: 3, date: "2024-06-05", amount: 1600 },
];

const Income = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <FontAwesome5 name="wallet" size={26} color={colors.primary} />
          <Text style={styles.totalLabel}>Total Earnings</Text>
          <Text style={styles.totalAmount}>NPR 32,500</Text>
        </View>

        {/* Monthly Overview */}
        <View style={styles.monthCard}>
          <Ionicons name="calendar" size={22} color={colors.primary} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.monthLabel}>June Earnings</Text>
            <Text style={styles.monthAmount}>NPR 5,600</Text>
          </View>
        </View>

        {/* Recent Payouts */}
        <Text style={styles.sectionTitle}>Recent Payouts</Text>
        {payouts.map((item) => (
          <View key={item.id} style={styles.payoutItem}>
            <Text style={styles.payoutDate}>{item.date}</Text>
            <Text style={styles.payoutAmount}>NPR {item.amount}</Text>
          </View>
        ))}

        {payouts.length === 0 && (
          <Text style={styles.noData}>No payout history available.</Text>
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
