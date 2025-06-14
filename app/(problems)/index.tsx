import { View, ScrollView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import BackButton from "@/components/BackButton";
import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { Feather } from "@expo/vector-icons"; // For icons

const skills = [
  { label: "Plumbing", icon: "tool" },
  { label: "Electricity", icon: "zap" },
  { label: "Lockwork", icon: "lock" },
  { label: "Heating", icon: "thermometer" },
];

const ProblemTypeScreen = () => {
  const router = useRouter();
  const { location } = useLocalSearchParams();

  const handleSelect = (type: string) => {
    router.push({
      pathname: "/(problems)/sub-problem",
      params: { type: type.toLowerCase(), location: location as string },
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <BackButton />
        <Typo size={22} fontWeight="700" style={styles.heading}>
          What seems to be the issue?
        </Typo>
        <Text style={styles.subtext}>
          Select a category so we can connect you with the right technician in {location}.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {skills.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.card}
            onPress={() => handleSelect(item.label)}
          >
            <Feather name={item.icon as any} size={34} color={colors.primary} style={styles.icon} />
            <Text style={styles.cardText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProblemTypeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 55,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.neutral200,
  },
  heading: {
    marginTop: 16,
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.neutral600,
  },
  grid: {
    padding: 20,
    gap: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.neutral200,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 5,
  },
  icon: {
    marginRight: 14,
  },
  cardText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: fonts.medium,
  },
});
