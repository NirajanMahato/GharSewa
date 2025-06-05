import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen"; // important to avoid blank screen
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

// Keep splash screen visible while fonts are loading
SplashScreen.preventAutoHideAsync();

const _layout = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Light": require("@/assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide splash screen when fonts are ready
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Stay on splash screen while fonts load
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default _layout;

const styles = StyleSheet.create({});
