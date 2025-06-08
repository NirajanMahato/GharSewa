import CustomTabs from "@/components/CustomTabs";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const _layout = () => {
  return (
    <Tabs tabBar={CustomTabs} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="Explore" />
      <Tabs.Screen name="Requests" />
      <Tabs.Screen name="Messages" />
      <Tabs.Screen name="Account" />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
