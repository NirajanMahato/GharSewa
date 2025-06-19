import { colors } from "@/constants/theme";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

const index = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      if (authContext?.user) {
        // User is authenticated, redirect based on role
        if (authContext.user.role === "technician") {
          router.replace("/(technician)");
        } else {
          router.replace("/(drawer)");
        }
      } else {
        // User is not authenticated, redirect to login
        router.replace("/(auth)/login");
      }
    }, 2000);
  }, [authContext?.user]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("@/assets/images/GharSewaLogo.png")}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral100,
  },
  logo: {
    height: "25%",
    aspectRatio: 1,
  },
});
