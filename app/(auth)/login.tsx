import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    console.log(mobileNumber, password);
  };

  const handleRegister = () => {
    router.push("/(auth)/register");
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/GharSewaLogo.png")}
          style={styles.logo}
        />

        <Typo style={styles.title}>Login via phone number</Typo>

        <InputField
          label="Mobile Number"
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
        <InputField
          label="Password"
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => router.push("/(auth)/forgotPassword")}
        >
          <Typo style={styles.forgotPasswordText}>Forgot your password?</Typo>
        </TouchableOpacity>

        <PrimaryButton
          title="Next"
          onPress={handleLogin}
          marginTop={50}
          width={"100%"}
          height={60}
        />

        <View style={styles.registerContainer}>
          <Typo style={styles.registerText}>Don’t have an account? </Typo>
          <TouchableOpacity onPress={handleRegister}>
            <Typo style={styles.registerLink}>Register</Typo>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

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
  title: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 30,
    textAlign: "left",
  },
  forgotPassword: {
    marginTop: 1,
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  registerText: {
    fontSize: 15,
    color: colors.textPrimary,
    fontFamily: fonts.regular,
  },
  registerLink: {
    fontSize: 15,
    color: colors.primary,
    fontFamily: fonts.medium,
    textDecorationLine: "underline",
  },
});
