import { colors } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CustomerMessage,
  customerMessages,
} from "./customerMessages";

const Message = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const messages = customerMessages;

  const renderItem = ({ item }: { item: CustomerMessage }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() =>
        router.push({
          pathname: `/(chat)/${item.id}` as any,
          params: {
            name: item.name,
            avatar: item.avatar,
          },
        })
      }
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.sidebarBtn}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="menu" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      {messages.length === 0 ? (
        <View style={styles.emptyState}>
          <Feather name="message-circle" size={60} color={colors.primary} />
          <Text style={styles.emptyText}>No messages yet</Text>
        </View>
      ) : (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 10 }}
        />
      )}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 16,
  },
  sidebarBtn: {
    position: "absolute",
    left: 0,
    top: 7,
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
    backgroundColor: "#e0e7ff",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 2,
  },
  lastMessage: {
    fontSize: 14,
    color: "#6b7280",
    maxWidth: 200,
  },
  rightSection: {
    alignItems: "flex-end",
    marginLeft: 10,
  },
  time: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 6,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 18,
    fontWeight: "500",
  },
});
