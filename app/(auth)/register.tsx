import BackButton from "@/components/BackButton";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import ValidationError from "@/components/ValidationError";
import { colors, fonts } from "@/constants/theme";
import { useRegister } from "@/hooks/useRegister";
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
} from "@/utils/validation";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const { registerUser, loading } = useRegister();

  const handleNext = async () => {
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
      password: "",
    };

    if (!firstName) newErrors.fullName = "Full name is required.";
    if (!emailAddress) newErrors.email = "Email address is required.";
    else if (!isValidEmail(emailAddress))
      newErrors.email = "Invalid email address.";

    if (!mobileNumber) newErrors.phone = "Mobile number is required.";
    else if (!isValidPhone(mobileNumber))
      newErrors.phone = "Mobile number must be 10 digits.";

    if (!password) newErrors.password = "Password is required.";
    else if (!isValidPassword(password))
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
    if (hasErrors) return;

    try {
      const success = await registerUser({
        fullName: firstName,
        email: emailAddress,
        phone: mobileNumber,
        password,
      });

      if (success) {
        Toast.show({
          type: "success",
          text1: "Registration Successful",
          text2: "You can now log in.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Registration Failed",
          text2: "Something went wrong. Please try again.",
        });
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err.message || "Something went wrong.",
      });
    }
  };

  return (
    <ScreenWrapper>
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
            <Typo style={styles.title}>Complete your info</Typo>

            <InputField
              label="Full Name"
              placeholder="Enter your full name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <ValidationError message={errors.fullName} />
            <InputField
              label="Email Address"
              placeholder="Enter your email address"
              keyboardType="email-address"
              value={emailAddress}
              onChangeText={setEmailAddress}
            />
            <ValidationError message={errors.email} />
            <InputField
              label="Mobile Number"
              placeholder="Enter your mobile number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
            <ValidationError message={errors.phone} />
            <InputField
              label="Password"
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              rightIcon={
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={18}
                  color={colors.neutral500}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <ValidationError message={errors.password} />

            <PrimaryButton
              title={loading ? "Processing..." : "Next"}
              onPress={handleNext}
              marginTop={40}
              width={"100%"}
              height={60}
              disabled={loading}
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
    marginBottom: 5,
    textAlign: "left",
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
