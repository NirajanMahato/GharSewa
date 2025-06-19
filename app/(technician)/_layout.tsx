import CustomTabs from "@/components/CustomTabs"; // Ensure path is correct
import { AuthContext } from "@/context/AuthContext";
import { Tabs, useRouter } from "expo-router";
import { useContext, useEffect } from "react";

export default function TechnicianLayout() {
  const { user } = useContext(AuthContext)!;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/login");
    } else if (user.role !== "technician") {
      router.replace("/(drawer)");
    }
  }, [user]);

  if (!user || user.role !== "technician") {
    return null; // Optionally, show a loading spinner here
  }

  return (
    <Tabs
      tabBar={(props) => <CustomTabs {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="income" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
