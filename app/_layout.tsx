// app/_layout.tsx
import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useContext, useEffect } from "react";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

// Authentication guard component
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(AuthContext)!;
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    const inTechnicianGroup = segments[0] === "(technician)";
    const inProfileGroup = segments[0] === "(profile)";
    const inBookingGroup = segments[0] === "(booking)";
    const inProblemsGroup = segments[0] === "(problems)";

    // If user is not authenticated and trying to access protected routes
    if (!user && !inAuthGroup && segments[0] !== "") {
      // Redirect to login
      router.replace("/(auth)/login");
    }
    // If user is authenticated and trying to access auth routes
    else if (user && inAuthGroup) {
      // Redirect to appropriate dashboard based on role
      if (user.role === "technician") {
        router.replace("/(technician)");
      } else {
        router.replace("/(drawer)");
      }
    }
  }, [user, segments]);

  return <>{children}</>;
};

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Light": require("@/assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <AuthProvider>
        <AuthGuard>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast />
        </AuthGuard>
      </AuthProvider>
    </>
  );
};

export default RootLayout;
