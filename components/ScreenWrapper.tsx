import { colors } from "@/constants/theme";
import { ScreenWrapperProps } from "@/types";
import React from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";

const { height } = Dimensions.get("window");

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  let paddingTop = Platform.OS === "ios" ? height * 0.045 : 50;

  return (
    <View style={[styles.wrapper, { paddingTop }, style]}>
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
