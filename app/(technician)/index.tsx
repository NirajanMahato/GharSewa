import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const mockRequests = [
  {
    id: "R001",
    customer: "Ram Prasad",
    location: "Koteshwor, Kathmandu",
    problem: "Power outage on second floor",
    time: "2 mins ago",
  },
  {
    id: "R002",
    customer: "Sita Adhikari",
    location: "Thamel",
    problem: "Broken light switch",
    time: "8 mins ago",
  },
];

const TechnicianDashboard = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.appbar}>
        <Typo size={25} fontWeight="700" style={styles.appbarTitle}>
          Requests
        </Typo>

        <TouchableOpacity onPress={() => router.push("/(technician)/settings")}>
          <Ionicons name="settings-outline" size={30} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {mockRequests.map((req) => (
          <TouchableOpacity key={req.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Typo fontWeight="700" size={15}>
                {req.customer}
              </Typo>
              <Text style={styles.timeText}>{req.time}</Text>
            </View>
            <Text style={styles.locationText}>{req.location}</Text>
            <Text style={styles.problemText}>{req.problem}</Text>
          </TouchableOpacity>
        ))}

        {mockRequests.length === 0 && (
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
});
