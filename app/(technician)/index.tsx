import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TechnicianDashboard = () => {
  const router = useRouter();

  const cards = [
    {
      label: "My Bookings",
      icon: (
        <FontAwesome5 name="calendar-check" size={24} color={colors.primary} />
      ),
      route: "/(technician)/my-bookings",
      bg: "#EFF6FF",
    },
    {
      label: "Profile",
      icon: <Ionicons name="person-circle" size={26} color={colors.primary} />,
      route: "/(technician)/profile",
      bg: "#ECFDF5",
    },
    {
      label: "Notifications",
      icon: <Ionicons name="notifications" size={24} color={colors.primary} />,
      route: "/(technician)/notifications",
      bg: "#FEF9C3",
    },
    {
      label: "Settings",
      icon: <Ionicons name="settings" size={24} color={colors.primary} />,
      route: "/(technician)/settings",
      bg: "#F3E8FF",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={styles.headerBox}>
        <Typo size={24} fontWeight="700" style={styles.title}>
          Welcome Back!
        </Typo>
        <Text style={styles.subtext}>Your service dashboard is ready.</Text>
      </View>

      <View style={styles.cardGrid}>
        {cards.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: item.bg }]}
            onPress={() => router.push(item.route)}
            activeOpacity={0.8}
          >
            <View style={styles.icon}>{item.icon}</View>
            <Text style={styles.cardLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default TechnicianDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerBox: {
    marginBottom: 30,
  },
  title: {
    color: colors.textPrimary,
  },
  subtext: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.neutral600,
    marginTop: 4,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  card: {
    width: "47%",
    borderRadius: 18,
    paddingVertical: 30,
    paddingHorizontal: 14,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 20,
  },
  icon: {
    marginBottom: 14,
  },
  cardLabel: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
    textAlign: "center",
  },
});
