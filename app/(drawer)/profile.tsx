import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { useFetchUser } from "@/hooks/useFetchUser";
import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const { user, loading } = useFetchUser();
  const router = useRouter();
  const navigation = useNavigation();


  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    router.push("/(tabs)/edit-profile");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2) || "NA"
    );
  };


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {/* Header Section */}
        <View style={styles.headerTopBar}>
        <TouchableOpacity
        style={styles.profileSidebarBtn}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Feather name="menu" size={28} color={colors.primary} />
      </TouchableOpacity>
          <Typo style={styles.headerTitle}>Profile</Typo>
          <View style={{ width: 32 }} /> 
        </View>
      <View style={styles.headerNew}>
        <View style={styles.headerRow}>
          <View style={styles.profileImageContainerNew}>
            {user?.profilePicture ? (
              <Image
                source={{ uri: user.profilePicture }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.defaultAvatar}>
                <Text style={styles.avatarText}>
                  {getInitials(user?.fullName || "User")}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.editImageBtn}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfoCol}>
            <Text style={styles.userName}>{user?.fullName || "User Name"}</Text>
            <Text style={styles.userEmail}>{user?.email || "Not provided"}</Text>
            <Text style={styles.userPhone}>{user?.phone || "Not provided"}</Text>
          </View>
        </View>
        <View style={styles.headerButtonRow}>
          <TouchableOpacity
            style={styles.actionButtonNew}
            onPress={handleEditProfile}
          >
            <Ionicons name="pencil" size={17} color={colors.neutral100} />
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtnNew}>
            <Ionicons
              name="log-out-outline"
              size={20}
              color="#fff"
              style={styles.logoutIcon}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Technician-specific information */}
      {user?.role === "technician" && (
        <>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Professional Information</Text>
            <View style={styles.infoCard}>
              {user?.skills && user.skills.length > 0 && (
                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Ionicons
                      name="construct-outline"
                      size={20}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Skills</Text>
                    <View style={styles.skillsContainer}>
                        {user.skills.map((skill: string, index: number) => (
                        <View style={styles.skillChip} key={index}>
                          <Text style={styles.skillText}>{skill}</Text>
                        </View>
                        ))}
                    </View>
                  </View>
                </View>
              )}

              {user?.experience && (
                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Ionicons
                      name="time-outline"
                      size={20}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Experience</Text>
                    <Text style={styles.infoValue}>
                      {user.experience}{" "}
                      {user.experience === 1 ? "year" : "years"}
                    </Text>
                  </View>
                </View>
              )}

              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <Ionicons
                    name={user?.verified ? "checkmark-circle" : "close-circle"}
                    size={20}
                    color={user?.verified ? "#4CAF50" : "#F44336"}
                  />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Verification Status</Text>
                  <Text
                    style={[
                      styles.infoValue,
                      { color: user?.verified ? "#4CAF50" : "#F44336" },
                    ]}
                  >
                    {user?.verified ? "Verified" : "Not Verified"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </>
      )}

      {/* Coming Soon Section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Coming Soon</Text>
        <View style={styles.infoCard}>
          <View style={styles.comingSoonItem}>
            <Ionicons
              name="time-outline"
              size={18}
              color={colors.textSecondary}
            />
            <Text style={styles.comingSoonText}>Service History</Text>
          </View>
          <View style={styles.comingSoonItem}>
            <Ionicons
              name="star-outline"
              size={18}
              color={colors.textSecondary}
            />
            <Text style={styles.comingSoonText}>Reviews & Ratings</Text>
          </View>
          <View style={styles.comingSoonItem}>
            <Ionicons
              name="cash-outline"
              size={18}
              color={colors.textSecondary}
            />
            <Text style={styles.comingSoonText}>Earnings Dashboard</Text>
          </View>
          <View style={styles.comingSoonItem}>
            <Ionicons
              name="analytics-outline"
              size={18}
              color={colors.textSecondary}
            />
            <Text style={styles.comingSoonText}>Performance Analytics</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },
  headerNew: {
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    marginTop:-1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: "relative",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImageContainerNew: {
    position: "relative",
    marginRight: 18,
  },
  userInfoCol: {
    flex: 1,
    justifyContent: "center",
  },
  userName: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: "#1a1a1a",
  },
  userEmail: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
  userPhone: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
  headerButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  actionButtonNew: {
    flexDirection: "row",
    width:"50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.neutral100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 8,
  },
  logoutBtnNew: {
    flexDirection: "row",
        width:"50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#db3944",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 30,
    shadowColor: "#FF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginLeft: 8,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: "#1a1a1a",
    marginBottom: 12,
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#1a1a1a",
    lineHeight: 22,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  skillChip: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.primary,
  },
  comingSoonItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  comingSoonText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    marginLeft: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
  },
  defaultAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },
  avatarText: {
    fontSize: 36,
    fontFamily: fonts.bold,
    color: "#fff",
  },
  editImageBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.neutral100,
    marginLeft: 8,
  },
  menuBtn: {
    position: "absolute",
    top: 20,
    left: 16,
    zIndex: 10,
    backgroundColor: "#f3f3f3",
    borderRadius: 20,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal:16,
    marginTop: 60,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  profileSidebarBtn: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    padding: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    zIndex: 10,
  },
});
