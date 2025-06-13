// app/(auth)/registerStepTwo.tsx
import BackButton from "@/components/BackButton";
import PrimaryButton from "@/components/PrimaryButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const RegisterStepTwo = () => {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId: string }>();

  const handleAllowLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      console.log("Location:", latitude, longitude);

      const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;
      await axios.post(`${baseURL}/api/user/location`, {
        userId,
        latitude,
        longitude,
      });

      router.replace("/(auth)/login"); // Navigate to home/tabs after saving
    } catch (error) {
      console.error("Location error:", error);
      alert("Failed to get location.");
    }
  };

  const handleNotNow = () => {
    router.replace("/(auth)/login");
  };

  return (
    <ScreenWrapper>
      {/* Header Section */}
      <View style={styles.header}>
        <BackButton />
        <Image
          source={require("@/assets/images/GharSewaLogo.png")}
          style={styles.logo}
        />

        <Typo style={styles.stepText}>Step 2/2</Typo>
      </View>

      <View style={styles.container}>
        {/* Image Placeholder */}
        <View style={styles.imageContainer}>
          <Ionicons
            name="location-outline"
            size={32}
            color={colors.primary}
            style={styles.logoIcon}
          />
        </View>

        {/* Title */}
        <Typo style={styles.title}>Allow location access?</Typo>

        {/* Subtitle */}
        <Typo style={styles.subtitle}>
          We need your location access to easily find GharSewa professionals
          around you.
        </Typo>

        {/* Buttons */}
        <PrimaryButton
          title="Allow location access"
          onPress={handleAllowLocation}
          marginTop={40}
          width={"100%"}
          height={56}
        />

        <TouchableOpacity onPress={handleNotNow} style={{ marginTop: 20 }}>
          <Typo style={styles.notNowText}>Not Now</Typo>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default RegisterStepTwo;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: colors.neutral200,
    marginTop: 20,
  },
  stepText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: fonts.regular,
  },
  logo: {
    alignSelf: "center",
    width: 140,
    height: 45,
    resizeMode: "cover",
  },
  logoIcon: {
    alignSelf: "center",
    fontSize: 40, // Bigger
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
    justifyContent: "flex-start",
    paddingTop: 130,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  locationImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    tintColor: colors.neutral300, // If you want a placeholder grey color
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  notNowText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
  },
});
