import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { AuthContext } from "@/context/AuthContext";
import { useFetchUser } from "@/hooks/useFetchUser";
import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const menuOptions = [
  {
    key: "payments",
    label: "Payment Methods",
    icon: <FontAwesome name="credit-card" size={18} color={colors.primary} />,
    route: "/(profile)/payment-methods",
  },
  {
    key: "notifications",
    label: "Notifications",
    icon: (
      <Ionicons name="notifications-outline" size={18} color={colors.primary} />
    ),
    route: "/(profile)/notifications",
  },
  {
    key: "support",
    label: "Help & Support",
    icon: <AntDesign name="questioncircleo" size={18} color={colors.primary} />,
    route: "/(profile)/support",
  },
];

const AccountScreen = () => {
  const router = useRouter();
  const { user, loading } = useFetchUser();
  const [isAvailable, setIsAvailable] = useState(user?.isAvailable ?? true);

  const handleEditProfile = () => {
    router.push("/(profile)/edit-profile");
  };

  const authContext = useContext(AuthContext);
  const logout = authContext?.logout;

  const handleOptionPress = (key: string, route?: string) => {
    if (key === "logout") {
      Alert.alert("Logout", "Are you sure you want to logout?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            if (logout) {
              await logout();
            }
            router.replace("/(auth)/login");
          },
        },
      ]);
    } else if (route) {
      router.push(route);
    }
  };

  if (loading || !user) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.loadingContainer}>
          <Typo size={14} color={colors.neutral500}>
            Loading...
          </Typo>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.appbar}>
          <Typo size={30} fontWeight="700" color={colors.black}>
            Account
          </Typo>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Typo size={18} fontWeight="700" color={colors.primary}>
                {user.firstName || user.fullName?.split(" ")[0] || "User"}{" "}
              </Typo>
              <Typo size={18} fontWeight="700" color={colors.black}>
                {user.lastName ||
                  user.fullName?.split(" ").slice(1).join(" ") ||
                  ""}
              </Typo>
            </View>
            <Typo size={14} color={colors.neutral500} style={styles.profession}>
              {user.profession || user.role || "Technician"}
            </Typo>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Feather name="edit-2" size={12} color={colors.white} />
              <Typo
                size={12}
                fontWeight="600"
                color={colors.white}
                style={styles.editButtonText}
              >
                Edit
              </Typo>
            </TouchableOpacity>
          </View>
          <View style={styles.profileIconContainer}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
            ) : (
              <Ionicons name="person" size={24} color={colors.primary} />
            )}
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.contactCard}>
          <Typo
            size={16}
            fontWeight="600"
            color={colors.black}
            style={styles.cardTitle}
          >
            Contact Information
          </Typo>

          <View style={styles.infoItem}>
            <Typo size={14} fontWeight="600" color={colors.black}>
              {user.phone || "Phone not provided"}
            </Typo>
            <Typo size={12} color={colors.neutral500}>
              Phone Number
            </Typo>
          </View>

          <View style={styles.infoItem}>
            <Typo size={14} fontWeight="600" color={colors.black}>
              Email
            </Typo>
            <Typo size={12} color={colors.neutral500}>
              {user.email || "Email not provided"}
            </Typo>
          </View>

          <View style={styles.infoItem}>
            <Typo size={14} fontWeight="600" color={colors.black}>
              Address
            </Typo>
            <Typo size={12} color={colors.neutral500}>
              {user.address || "Address not provided"}
            </Typo>
          </View>

          {(user.role === "service_provider" || user.profession) && (
            <View style={[styles.infoItem, styles.availabilityContainer]}>
              <View style={styles.availabilityText}>
                <Typo size={14} fontWeight="600" color={colors.black}>
                  Availability
                </Typo>
                <Typo size={12} color={colors.neutral500}>
                  {isAvailable
                    ? "You are available for new jobs"
                    : "You are currently unavailable"}
                </Typo>
              </View>
              <Switch
                value={isAvailable}
                onValueChange={setIsAvailable}
                thumbColor={colors.white}
                trackColor={{ false: colors.neutral300, true: colors.primary }}
                style={styles.switch}
              />
            </View>
          )}
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          {menuOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => router.push(option.route)}
            >
              <View style={styles.iconContainer}>{option.icon}</View>
              <Typo
                size={14}
                fontWeight="500"
                color={colors.black}
                style={styles.menuText}
              >
                {option.label}
              </Typo>
              <Feather
                name="chevron-right"
                size={18}
                color={colors.neutral400}
              />
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => handleOptionPress("logout")}
            activeOpacity={0.7}
          >
            <View style={styles.logoutIconBg}>
              <MaterialIcons name="logout" size={18} color="#dc2626" />
            </View>
            <Typo style={styles.logoutLabel}>Logout</Typo>
          </TouchableOpacity>
        </View>

        {/* Spacer */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appbar: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 2,
  },
  profession: {
    marginBottom: 10,
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  editButtonText: {
    marginLeft: 6,
  },
  profileIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.neutral100,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
    overflow: "hidden",
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  contactCard: {
    backgroundColor: colors.neutral50,
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  cardTitle: {
    marginBottom: 12,
  },
  infoItem: {
    marginBottom: 14,
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  availabilityText: {
    flex: 1,
    marginRight: 12,
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral100,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.neutral100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
  logoutIconBg: {
    backgroundColor: "#fee2e2",
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  logoutLabel: {
    fontSize: 15,
    color: "#dc2626",
    fontWeight: "600",
  },
  menuText: {
    flex: 1,
  },
});
