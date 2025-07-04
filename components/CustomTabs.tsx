import { colors, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Icons from "phosphor-react-native";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CustomTabs({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const tabbarIcons: any = {
    index: (isFocused: boolean) => (
      <Icons.ListBullets
        size={verticalScale(30)}
        // weight={isFocused ? "fill" : "regular"}
        color={isFocused ? colors.primary : colors.neutral600}
      />
    ),
    income: (isFocused: boolean) => (
      <Icons.BriefcaseMetal
        size={verticalScale(30)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? colors.primary : colors.neutral600}
      />
    ),
    messages: (isFocused: boolean) => (
      <Icons.Chat
        size={verticalScale(30)}
        weight="regular"
        color={isFocused ? colors.primary : colors.neutral600}
      />
    ),
    profile: (isFocused: boolean) => (
      <Icons.User
        size={verticalScale(30)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? colors.primary : colors.neutral600}
      />
    ),
  };

  const tabbarLabels: Record<string, string> = {
    index: "Requests",
    income: "Income",
    messages: "Messages",
    profile: "Profile",
  };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            // href={buildHref(route.name, route.params)}
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)}
            <Text
              style={{
                marginTop: 4,
                fontSize: 12,
                color: isFocused ? colors.primary : colors.neutral600,
                fontWeight: isFocused ? "bold" : "normal",
              }}
            >
              {tabbarLabels[route.name] || label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    width: "100%",
    height: Platform.OS === "ios" ? verticalScale(73) : verticalScale(65),
    backgroundColor: colors.white,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: colors.neutral200,
    borderTopWidth: 1,
  },
  tabbarItem: {
    marginBottom: Platform.OS == "ios" ? spacingY._10 : spacingY._10,
    justifyContent: "center",
    alignItems: "center",
  },
});
