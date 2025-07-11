import BackButton from "@/components/BackButton";

import { colors, fonts } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ChatCircle,
  Clock,
  CurrencyCircleDollar,
  MapPin,
} from "phosphor-react-native";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TechnicianFoundScreen = () => {
  const {
    technicianId,
    technicianName,
    skills,
    bookingId,
    budget,
    description,
  } = useLocalSearchParams();
  const router = useRouter();
  const [technician, setTechnician] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      try {
        const techData = {
          id: technicianId,
          fullName: technicianName,
          skills: skills
            ? Array.isArray(skills)
              ? skills
              : skills.split(",")
            : [],
          distance: "2.1 km away",
          arrivalTime: "10-15 minutes",
          serviceCharge: budget || "Rs 220",
          isOnline: true,
        };
        setTechnician(techData);
      } catch (err) {
        setError("Failed to load technician details.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, [technicianId, technicianName, skills, budget]);

  const handleStartChat = () => {
    if (!technician) return;

    router.push({
      pathname: "/(chat)/[id]",
      params: {
        bookingId: typeof bookingId === "string" ? bookingId : "",
        name: technician.fullName,
        avatar: technician.avatar || "",
        technicianId: technician.id,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Expert Found</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
          <View style={styles.technicianCard}>
            <View style={styles.avatarContainer}>
              <Image
                source={
                  technician?.avatar
                    ? { uri: technician.avatar }
                    : require("@/assets/images/technician_sample.jpg")
                }
                style={styles.avatar}
              />
              {technician?.isOnline && <View style={styles.onlineIndicator} />}
            </View>

            <Text style={styles.name}>
              {technician?.fullName || "Milan Mistri"}
            </Text>
            <Text style={styles.role}>
              {technician?.role || "Plumbing Specialist"}
            </Text>

            <View style={styles.locationRow}>
              <MapPin size={14} color="#6b7280" />
              <Text style={styles.locationText}>
                {technician?.distance || "2.1 km away"}
              </Text>
            </View>
          </View>
        )}

        {!loading && !error && (
          <>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Clock size={18} color="#6b7280" />
                <View>
                  <Text style={styles.infoLabel}>Arrival Time</Text>
                  <Text style={styles.infoValue}>
                    {technician?.arrivalTime || "10-15 minutes"}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <CurrencyCircleDollar size={18} color="#6b7280" />
                <View>
                  <Text style={styles.infoLabel}>Service Charge</Text>
                  <Text style={styles.infoValue}>
                    {budget
                      ? `Rs ${budget}`
                      : technician?.serviceCharge || "Rs 220"}
                  </Text>
                </View>
              </View>

              {description && (
                <View style={styles.infoRow}>
                  <View style={{ width: 18, height: 18, marginRight: 12 }}>
                    <Text style={{ fontSize: 12, color: "#6b7280" }}>📝</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.infoLabel}>Problem Description</Text>
                    <Text
                      style={[
                        styles.infoValue,
                        { fontSize: 12, lineHeight: 16 },
                      ]}
                    >
                      {description}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.chatButton,
                !technician && styles.chatButtonDisabled,
              ]}
              onPress={handleStartChat}
              disabled={!technician}
            >
              <ChatCircle size={24} color="#ffffff" weight="fill" />
              <Text style={styles.chatButtonText}>Start Chat</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default TechnicianFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: "#1f2937",
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  successText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#10b981",
    textAlign: "center",
    marginBottom: 32,
  },
  technicianCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#10b981",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: "#1f2937",
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: "#6b7280",
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: "#6b7280",
    marginLeft: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: "#6b7280",
  },
  infoCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    gap: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: "#6b7280",
  },
  infoValue: {
    fontSize: 14,
    fontFamily: fonts.semiBold || fonts.bold,
    color: "#1f2937",
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    marginBottom: 32,
  },
  chatButtonDisabled: {
    backgroundColor: "#9ca3af",
    opacity: 0.6,
  },
  chatButtonText: {
    fontSize: 16,
    fontFamily: fonts.semiBold || fonts.bold,
    color: "#ffffff",
  },
});
