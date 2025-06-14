// app/(problems)/search-type.tsx
import BackButton from "@/components/BackButton";
import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Rocket, Timer } from "phosphor-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SearchTypeScreen = () => {
  const router = useRouter();
  const { type, sub } = useLocalSearchParams();

  const handleSelect = (selected: string) => {
    router.push({
      pathname: "/(booking)/searching", // or your booking screen
      params: { type, sub, searchType: selected },
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={{ marginBottom: 16 }}>
        <BackButton />
      </View>

      <Typo size={24} fontWeight="700" style={styles.title}>
        Choose Search Type
      </Typo>

      <Text style={styles.subtext}>
        Rapid search gets you help faster with a higher cost. Slow search saves
        money by waiting for technician availability.
      </Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => handleSelect("rapid")}
        >
          <Rocket
            size={28}
            color={colors.primary}
            weight="duotone"
            style={{ marginBottom: 10 }}
          />
          <Text style={styles.optionTitle}>Rapid Search</Text>
          <Text style={styles.optionDesc}>
            Get immediate help from nearby technicians. Priority service at a
            premium rate.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => handleSelect("slow")}
        >
          <Timer
            size={28}
            color={colors.primary}
            weight="duotone"
            style={{ marginBottom: 10 }}
          />
          <Text style={styles.optionTitle}>Slow Search</Text>
          <Text style={styles.optionDesc}>
            Wait for available technicians at a lower cost. Best for flexible
            schedules.
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SearchTypeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingTop: 55,
  },
  title: {
    color: colors.textPrimary,
    marginBottom: 10,
  },
  subtext: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.regular,
    marginBottom: 25,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.neutral300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  optionTitle: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  optionDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.regular,
  },
});
