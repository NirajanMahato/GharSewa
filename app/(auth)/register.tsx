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

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleNext = () => {
    console.log(firstName, emailAddress, mobileNumber, password);
    router.push("/(auth)/registerStepTwo");
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
        <Typo style={styles.stepText}>Step 1/2</Typo>
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
            {/* Title */}
            <Typo style={styles.title}>Complete your info</Typo>

            {/* Input Fields */}
            <InputField
              label="Full Name"
              placeholder="Enter your full name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <InputField
              label="Email Address"
              placeholder="Enter your email address"
              keyboardType="email-address"
              value={emailAddress}
              onChangeText={setEmailAddress}
            />
            <InputField
              label="Mobile Number"
              placeholder="Enter your mobile number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* Next Button */}
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

export default Register;

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
  title: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 30,
    textAlign: "left",
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
