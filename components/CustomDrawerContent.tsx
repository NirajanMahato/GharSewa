// app/components/CustomDrawerContent.tsx

import { colors, fonts } from "@/constants/theme";
import { AuthContext } from "@/context/AuthContext";
import { Feather } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { usePathname, useRouter } from "expo-router";
import { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const CustomDrawerContent = (props: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useContext(AuthContext) ?? {};

  const drawerItems = [
    { label: "Home", route: "/", icon: "home" },
    { label: "Profile", route: "/profile", icon: "user" },
    { label: "Messages", route: "/message", icon: "message-circle" },
    { label: "Settings", route: "/settings", icon: "settings" },
  ];

  const handleTechnicianMode = () => {
    if (user?.role === "technician") {
      router.push("/(technician)");
    } else if (user?.role === "customer") {
      Toast.show({
        type: "error",
        text1: "Technician Access Restricted",
        text2: "You must register as a technician to access this feature.",
      });
      router.push("/(drawer)");
    } else {
      router.push("/(auth)/login");
    }
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.header}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("@/assets/images/GharSewaLogo.png")}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.menuContainer}>
          {drawerItems.map((item) => {
            const isActive = pathname === item.route;
            return (
              <DrawerItem
                key={item.route}
                label={({ focused }) => (
                  <Text
                    style={[
                      styles.drawerLabel,
                      (isActive || focused) && styles.activeLabel,
                    ]}
                  >
                    {item.label}
                  </Text>
                )}
                onPress={() => router.push(item.route as any)}
                icon={({ focused }) => (
                  <Feather
                    name={item.icon as any}
                    size={22}
                    color={
                      isActive || focused ? colors.primary : colors.neutral400
                    }
                  />
                )}
                style={[styles.drawerItem, isActive && styles.activeItem]}
                focused={isActive}
              />
            );
          })}
        </View>
      </DrawerContentScrollView>

      <Pressable style={styles.bottomButton} onPress={handleTechnicianMode}>
        <Text style={styles.bottomButtonText}>Technician Mode</Text>
      </Pressable>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.white,
  },
  scrollContainer: {
    paddingTop: 0,
  },
  header: {
    paddingLeft: 15,
    paddingTop: 55,
  },
  logo: {
    width: 170,
    height: 60,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral200,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  menuContainer: {
    paddingTop: 4,
  },
  drawerItem: {
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 2,
    overflow: "hidden",
  },
  activeItem: {
    backgroundColor: colors.primary + "15",
  },
  drawerLabel: {
    fontSize: 16,
    color: colors.neutral700,
    fontFamily: fonts.medium,
  },
  activeLabel: {
    color: colors.primary,
    fontFamily: fonts.bold,
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 60,
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  bottomButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: fonts.medium,
  },
});
