import { colors, fonts } from "@/constants/theme";
import React from "react";
import {
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  marginTop?: number;
  width?: DimensionValue; // <-- Proper type for width
  height?: DimensionValue; // <-- Proper type for height
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  marginTop = 16,
  width = "100%",
  height = 56,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { marginTop, width, height }]}
      onPress={onPress}
      {...props}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.semiBold,
    letterSpacing: 0.5,
  },
});
