import BackButton from "@/components/BackButton";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import ValidationError from "@/components/ValidationError";
import { colors, fonts } from "@/constants/theme";
import { useChangePassword } from "@/hooks/useChangePassword";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState({ confirmPassword: false });

  const { changePassword, loading } = useChangePassword();

  const isPasswordMatch = newPassword === confirmPassword;

  const handleBlur = (field: keyof typeof touched) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleChangePassword = async () => {
    if (!isPasswordMatch) return;

    try {
      await changePassword({ currentPassword, newPassword });
      Alert.alert("Success", "Password changed successfully!", [
        {
          text: "OK",
          onPress: () => {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTouched({ confirmPassword: false });
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BackButton />
        </View>
        <Text style={styles.title}>Change Password</Text>
        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <InputField
            label="Current Password"
            placeholder="Enter current password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!showCurrentPassword}
            textContentType="password"
            autoComplete="password"
            rightIcon={
              <Feather
                name={showCurrentPassword ? "eye-off" : "eye"}
                size={18}
                color={colors.neutral500}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              />
            }
          />

          <InputField
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            textContentType="newPassword"
            autoComplete="new-password"
            rightIcon={
              <Feather
                name={showNewPassword ? "eye-off" : "eye"}
                size={18}
                color={colors.neutral500}
                onPress={() => setShowNewPassword(!showNewPassword)}
              />
            }
          />

          <InputField
            label="Confirm Password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            onBlur={() => handleBlur("confirmPassword")}
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            rightIcon={
              <Feather
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={18}
                color={colors.neutral500}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
          />
          {touched.confirmPassword && !isPasswordMatch && (
            <ValidationError message="Passwords do not match" />
          )}

          <PrimaryButton
            title="Save Changes"
            style={[styles.button, !isPasswordMatch && styles.buttonDisabled]}
            onPress={handleChangePassword}
            loading={loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  headerLeft: {
    width: 40,
    alignItems: "flex-start",
  },
  headerRight: {
    width: 40,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: "#111827",
    textAlign: "center",
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },
  buttonDisabled: {
    backgroundColor: colors.neutral300,
  },
});
