// app/(auth)/login.tsx
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { useLogin } from "@/hooks/useLogin";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, loading: isLoading } = useLogin();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await loginUser({ email, password });
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: err.message,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setPassword("");
      setShowPassword(false);
    }, [])
  );

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
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          label="Password"
          placeholder="Enter password"
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

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => router.push("/(auth)/forgotPassword")}
        >
          <Typo style={styles.forgotPasswordText}>Forgot your password?</Typo>
        </TouchableOpacity>

        <PrimaryButton
          title="Login"
          onPress={handleLogin}
          loading={isLoading}
          marginTop={40}
          width={"100%"}
          height={60}
        />

        <View style={styles.registerContainer}>
          <Typo style={styles.registerText}>Don't have an account? </Typo>
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
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  logo: {
    alignSelf: "center",
    marginTop: 90,
    marginBottom: 40,
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 30,
    textAlign: "left",
  },
  forgotPassword: {
    marginTop: 8,
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
