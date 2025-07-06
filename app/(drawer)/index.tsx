import BookingModal from "@/components/BookingModal";
import { colors, fonts } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Home = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const navigation = useNavigation();
  const router = useRouter();

  const fetchTechnicians = async () => {
    try {
      const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;
      const response = await fetch(`${baseURL}/api/technician`);
      const data = await response.json();
      setTechnicians(data);
    } catch (error) {
      console.error("Error fetching technicians:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTechnicians();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const getSkillIcon = (skill: string) => {
    switch (skill) {
      case "plumbing":
        return "🔧";
      case "electricity":
        return "⚡";
      case "lockwork":
        return "🔐";
      case "heating":
        return "❄️";
      default:
        return "🛠️";
    }
  };

  const handleBookTechnician = (technician: any) => {
    setSelectedTechnician(technician);
    setBookingModalVisible(true);
  };

  const renderTechnicianCard = ({ item }: { item: any }) => (
    <View style={styles.technicianCard}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {item.fullName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.technicianName}>{item.fullName}</Text>
          <View style={styles.ratingContainer}>
            <Feather name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating || 4.5}</Text>
            <Text style={styles.jobsText}>
              ({item.completedJobs || 25} jobs)
            </Text>
          </View>
        </View>
        <View style={styles.availabilityBadge}>
          <View style={styles.availabilityDot} />
          <Text style={styles.availabilityText}>Available</Text>
        </View>
      </View>

      <View style={styles.skillsContainer}>
        <Text style={styles.skillsLabel}>Services:</Text>
        <View style={styles.skillsList}>
          {item.skills.map((skill: string, index: number) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillIcon}>{getSkillIcon(skill)}</Text>
              <Text style={styles.skillText}>
                {skill.charAt(0).toUpperCase() + skill.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {item.companyName && (
        <View style={styles.companyInfo}>
          <Feather name="briefcase" size={14} color={colors.neutral500} />
          <Text style={styles.companyText}>{item.companyName}</Text>
        </View>
      )}

      <View style={styles.experienceInfo}>
        <Feather name="clock" size={14} color={colors.neutral500} />
        <Text style={styles.experienceText}>
          {item.experience || 3} years experience
        </Text>
      </View>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => handleBookTechnician(item)}
      >
        <Text style={styles.bookButtonText}>Book Now</Text>
        <Feather name="arrow-right" size={16} color={colors.white} />
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.subtitleText}>
        Choose from our verified technicians
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Feather name="users" size={48} color={colors.neutral400} />
      <Text style={styles.emptyTitle}>No technicians available</Text>
      <Text style={styles.emptySubtitle}>
        Check back later for available technicians
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="menu" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Available Technicians</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={technicians}
        renderItem={renderTechnicianCard}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {bookingModalVisible && selectedTechnician && (
        <BookingModal
          visible={bookingModalVisible}
          onClose={() => setBookingModalVisible(false)}
          technician={selectedTechnician}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral100,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral200,
  },
  menuButton: {
    padding: 8,
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
  },
  profileButton: {
    padding: 8,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.neutral600,
  },
  technicianCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  headerInfo: {
    flex: 1,
  },
  technicianName: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
    marginLeft: 4,
  },
  jobsText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.neutral500,
    marginLeft: 4,
  },
  availabilityBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22C55E",
    marginRight: 4,
  },
  availabilityText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: "#22C55E",
  },
  skillsContainer: {
    marginBottom: 12,
  },
  skillsLabel: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  skillsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutral100,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skillIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  skillText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  companyText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.neutral600,
    marginLeft: 6,
  },
  experienceInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  experienceText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.neutral600,
    marginLeft: 6,
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.neutral600,
    textAlign: "center",
  },
});
