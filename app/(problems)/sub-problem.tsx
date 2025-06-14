import BackButton from "@/components/BackButton";
import PrimaryButton from "@/components/PrimaryButton";
import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const subProblemsMap: Record<string, string[]> = {
  plumbing: ["Leaky Faucet", "Clogged Drain", "Pipe Burst", "Other"],
  electricity: ["Power Outage", "Faulty Socket", "Wiring Issue", "Other"],
  lockwork: ["Broken Lock", "Key Stuck", "Need Replacement", "Other"],
  heating: ["No Heat", "Strange Noise", "Thermostat Issue", "Other"],
};

const SubProblemScreen = () => {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const [selected, setSelected] = useState<string>("");

  const problems = subProblemsMap[type as string] || [];

  const handleNext = () => {
    if (!selected) return;
    router.push({
      pathname: "/(problems)/search-type",
      params: { type: type as string, sub: selected },
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <BackButton />
        <Typo size={24} fontWeight="700" style={styles.heading}>
          What’s the issue?
        </Typo>
        <Text style={styles.subtext}>
          Let us know what kind of problem you're facing with{" "}
          <Text style={{ fontWeight: "600" }}>{type}</Text>.
        </Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.list}>
        {problems.map((item) => {
          const isSelected = selected === item;
          return (
            <TouchableOpacity
              key={item}
              onPress={() => setSelected(item)}
              style={[styles.option, isSelected && styles.optionSelected]}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {item}
              </Text>
              {isSelected && (
                <Feather name="check-circle" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton title="Next" onPress={handleNext} disabled={!selected} />
      </View>
    </View>
  );
};

export default SubProblemScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.neutral200,
    
  },
  heading: {
    marginTop: 16,
    color: colors.textPrimary,
  },
  subtext: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.neutral600,
    marginTop: 6,
    lineHeight: 20,
  },
  scroll: {
    flex: 1,
  },
  list: {
    padding: 20,
    paddingBottom: 0,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  optionSelected: {
    backgroundColor: colors.cardBackground ,
    borderColor: colors.primary,
    borderWidth:2,
  },
  optionText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
  },
  optionTextSelected: {
    color: colors.primary,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: colors.background,
  },
});
