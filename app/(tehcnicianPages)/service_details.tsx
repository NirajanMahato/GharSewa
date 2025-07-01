import { colors, fonts } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChatCircle } from "phosphor-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TechnicianServiceDetails = () => {
  const router = useRouter();
  const { bookingId, customer, serviceType, problemType, address } =
    useLocalSearchParams();

  const handleChat = () => {
    router.push({
      pathname: "/(chat)/[id]",
      params: {
        bookingId: bookingId as string,
        name: customer as string,
        avatar: "",
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Service Details</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Customer:</Text>
        <Text style={styles.value}>{customer}</Text>
        <Text style={styles.label}>Service:</Text>
        <Text style={styles.value}>{serviceType}</Text>
        <Text style={styles.label}>Problem:</Text>
        <Text style={styles.value}>{problemType}</Text>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{address}</Text>
      </View>
      <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
        <ChatCircle size={24} color="#fff" weight="fill" />
        <Text style={styles.chatButtonText}>Chat with Customer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TechnicianServiceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 24,
    textAlign: "center",
  },
  card: {
    backgroundColor: colors.neutral100,
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: colors.neutral600,
    fontFamily: fonts.medium,
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: fonts.semiBold,
    marginBottom: 4,
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
  },
  chatButtonText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: "#fff",
    marginLeft: 8,
  },
});
