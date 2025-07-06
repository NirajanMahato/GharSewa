import BackButton from "@/components/BackButton";
import { useUserBookings } from "@/hooks/useUserBookings";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyBookings = () => {
  const { bookings, loading, error, refetch } = useUserBookings();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return styles.completed;
      case "accepted":
        return styles.upcoming;
      case "pending":
        return styles.pending;
      case "rejected":
        return styles.rejected;
      default:
        return styles.upcoming;
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.service}>{item.serviceType}</Text>
        <Text style={styles.datetime}>
          {formatDate(item.scheduledDate)} • {formatTime(item.scheduledTime)}
        </Text>
        <Text style={[styles.status, getStatusColor(item.status)]}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
        {item.technician && (
          <Text style={styles.technician}>
            Technician: {item.technician.fullName}
          </Text>
        )}
        <Text style={styles.address}>Address: {item.address}</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#9ca3af" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <BackButton />

        <Text style={styles.title}>My Bookings</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Loading bookings...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Feather name="calendar" size={48} color="#9ca3af" />
              <Text style={styles.emptyText}>No bookings found</Text>
              <Text style={styles.emptySubtext}>
                Your booking history will appear here
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default MyBookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
  listContent: {
    padding: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardLeft: {
    flex: 1,
  },
  service: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  datetime: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 6,
  },
  status: {
    fontSize: 13,
    fontWeight: "600",
  },
  completed: {
    color: "#059669",
  },
  upcoming: {
    color: "#2563eb",
  },
  pending: {
    color: "#f59e0b",
  },
  rejected: {
    color: "#dc2626",
  },
  technician: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  address: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  separator: {
    height: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6b7280",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#dc2626",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6b7280",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 8,
    textAlign: "center",
  },
});
