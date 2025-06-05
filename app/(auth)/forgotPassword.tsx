import BackButton from "@/components/BackButton";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleNext = () => {
    console.log("Email for password reset:", email);
    const router = useRouter();

    router.replace("/(auth)/checkEmail");
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
        <View style={{ width: 45 }}></View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Image
              source={require("@/assets/images/forgot_password_illustration.jpg")}
              style={styles.illustration}
            />
            <Typo style={styles.title}>Let's reset your password</Typo>
            <Typo style={styles.title2}>
              We will email you a link you can use to reset your password.
            </Typo>

            <InputField
              label="Email Address"
              placeholder="Enter your email address"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <PrimaryButton
              title="Next"
              onPress={handleNext}
              marginTop={40}
              width={"100%"}
              height={60}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: colors.neutral200,
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    alignSelf: "center",
    width: 140,
    height: 45,
    resizeMode: "cover",
  },
  illustration: {
    alignSelf: "center",
    width: 250,
    height: 220,
    resizeMode: "cover",
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginTop: 30,
    marginBottom: 15,
    textAlign: "left",
  },
  title2: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.textPrimary,
    marginBottom: 30,
    textAlign: "left",
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
