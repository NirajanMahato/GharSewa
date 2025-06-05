import PrimaryButton from "@/components/PrimaryButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const CheckEmail = () => {
  const router = useRouter();

  const handleResend = () => {
    console.log("Resend reset email");
    // Resend email logic
  };

  const handleBackToLogin = () => {
    router.replace("/(auth)/login");
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/GharSewaLogo.png")}
          style={styles.logo}
        />
        <TouchableOpacity onPress={handleBackToLogin} style={styles.backButton}>
          <AntDesign name="arrowleft" size={20} color="black" />
          <Typo style={styles.backText}> Back to login</Typo>
        </TouchableOpacity>
        {/* Check Icon */}
        <View style={styles.iconContainer}>
          <Ionicons
            name="checkmark-done-circle-outline"
            size={64}
            color={colors.primary}
          />
        </View>

        {/* Title */}
        <Typo style={styles.title}>Check your email</Typo>

        {/* Subtitle */}
        <Typo style={styles.subtitle}>
          We sent a link to{" "}
          <Typo style={styles.emailText}>nirajanmahato44@gmail.com</Typo> to
          help set up a new password if you have an account with us.
        </Typo>

        {/* Resend Button */}
        <PrimaryButton
          title="Resend Email Address"
          onPress={handleResend}
          marginTop={40}
          width="100%"
          height={56}
        />
      </View>
    </ScreenWrapper>
  );
};

export default CheckEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  logo: {
    alignSelf: "center",
    marginTop: 90,
    marginBottom: 40,
    width: 220,
    height: 50,
    resizeMode: "cover",
  },
  backButton: {
    flexDirection: "row",
    marginTop: 20,
  },
  backText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontFamily: fonts.regular,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 60,
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
    paddingHorizontal: 30,
  },
  emailText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
  },
});
