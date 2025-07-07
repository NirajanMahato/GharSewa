import BackButton from "@/components/BackButton";
import { colors, fonts } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "booking" | "payment" | "reminder" | "promo" | "system";
  time: string;
  isRead: boolean;
}

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [bookingNotifications, setBookingNotifications] = useState(true);
  const [paymentNotifications, setPaymentNotifications] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(true);
  const [promoNotifications, setPromoNotifications] = useState(false);
  const [systemNotifications, setSystemNotifications] = useState(true);

  // Empty notifications array - will be populated from API
  const [notifications] = useState<NotificationItem[]>([]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Feather name="calendar" size={20} color={colors.primary} />;
      case "payment":
        return <Feather name="credit-card" size={20} color={colors.success} />;
      case "reminder":
        return <Feather name="clock" size={20} color={colors.primary} />;
      case "promo":
        return <Feather name="gift" size={20} color={colors.rose} />;
      case "system":
        return <Feather name="settings" size={20} color={colors.neutral600} />;
      default:
        return <Feather name="bell" size={20} color={colors.primary} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "booking":
        return colors.primary;
      case "payment":
        return colors.success;
      case "reminder":
        return colors.primary;
      case "promo":
        return colors.rose;
      case "system":
        return colors.neutral600;
      default:
        return colors.primary;
    }
  };

  const handleMarkAllAsRead = () => {
    Alert.alert(
      "Mark All as Read",
      "Are you sure you want to mark all notifications as read?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Mark as Read",
          onPress: () => console.log("Mark all as read"),
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      "Clear All Notifications",
      "Are you sure you want to clear all notifications? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => console.log("Clear all"),
        },
      ]
    );
  };

  const renderNotificationItem = (item: NotificationItem) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.notificationItem,
        !item.isRead && styles.unreadNotification,
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.notificationIcon}>
        {getNotificationIcon(item.type)}
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
        {!item.isRead && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BackButton />
        </View>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleMarkAllAsRead}
            activeOpacity={0.7}
          >
            <Feather name="check" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Notification Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="bell" size={20} color={colors.textPrimary} />
              <Text style={styles.settingLabel}>All Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{
                false: colors.neutral300,
                true: colors.primaryLight,
              }}
              thumbColor={
                notificationsEnabled ? colors.primary : colors.neutral400
              }
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="calendar" size={20} color={colors.textPrimary} />
              <Text style={styles.settingLabel}>Booking Updates</Text>
            </View>
            <Switch
              value={bookingNotifications}
              onValueChange={setBookingNotifications}
              trackColor={{
                false: colors.neutral300,
                true: colors.primaryLight,
              }}
              thumbColor={
                bookingNotifications ? colors.primary : colors.neutral400
              }
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather
                name="credit-card"
                size={20}
                color={colors.textPrimary}
              />
              <Text style={styles.settingLabel}>Payment Notifications</Text>
            </View>
            <Switch
              value={paymentNotifications}
              onValueChange={setPaymentNotifications}
              trackColor={{
                false: colors.neutral300,
                true: colors.primaryLight,
              }}
              thumbColor={
                paymentNotifications ? colors.primary : colors.neutral400
              }
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="clock" size={20} color={colors.textPrimary} />
              <Text style={styles.settingLabel}>Service Reminders</Text>
            </View>
            <Switch
              value={reminderNotifications}
              onValueChange={setReminderNotifications}
              trackColor={{
                false: colors.neutral300,
                true: colors.primaryLight,
              }}
              thumbColor={
                reminderNotifications ? colors.primary : colors.neutral400
              }
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="gift" size={20} color={colors.textPrimary} />
              <Text style={styles.settingLabel}>Promotional Offers</Text>
            </View>
            <Switch
              value={promoNotifications}
              onValueChange={setPromoNotifications}
              trackColor={{
                false: colors.neutral300,
                true: colors.primaryLight,
              }}
              thumbColor={
                promoNotifications ? colors.primary : colors.neutral400
              }
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="settings" size={20} color={colors.textPrimary} />
              <Text style={styles.settingLabel}>System Updates</Text>
            </View>
            <Switch
              value={systemNotifications}
              onValueChange={setSystemNotifications}
              trackColor={{
                false: colors.neutral300,
                true: colors.primaryLight,
              }}
              thumbColor={
                systemNotifications ? colors.primary : colors.neutral400
              }
            />
          </View>
        </View>

        {/* Recent Notifications Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Notifications</Text>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearAll}
              activeOpacity={0.7}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          {notifications.length > 0 ? (
            <View style={styles.notificationsList}>
              {notifications.map(renderNotificationItem)}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Feather name="bell-off" size={48} color={colors.neutral400} />
              <Text style={styles.emptyStateTitle}>No Notifications</Text>
              <Text style={styles.emptyStateMessage}>
                You're all caught up! New notifications will appear here.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  headerLeft: {
    width: 40,
    alignItems: "flex-start",
  },
  headerRight: {
    width: 40,
    alignItems: "flex-end",
  },
  headerButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: "#111827",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: "#111827",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: "#374151",
    marginLeft: 12,
  },
  clearButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  clearButtonText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.rose,
  },
  notificationsList: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    overflow: "hidden",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  unreadNotification: {
    backgroundColor: "#f8fafc",
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    position: "relative",
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: "#111827",
    flex: 1,
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: "#6b7280",
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: "#6b7280",
    lineHeight: 20,
  },
  unreadDot: {
    position: "absolute",
    top: 4,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 40,
  },
});
