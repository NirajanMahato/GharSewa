// app/(chat)/[id].tsx
import { fonts } from "@/constants/theme";
import { AuthContext } from "@/context/AuthContext";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import io from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // Change to your backend URL if needed
const API_URL = "http://localhost:5000/api/bookings";
const MESSAGES_URL = "http://localhost:5000/api/messages";
const socket = io(SOCKET_URL);

interface Message {
  id: string;
  text: string;
  time: string;
  sent: boolean;
  senderId?: string;
  receiverId?: string;
}

const Chat = () => {
  const router = useRouter();
  const { bookingId, name, avatar } = useLocalSearchParams<{
    bookingId?: string;
    name?: string;
    avatar?: string;
  }>();
  const { user, token } = useContext(AuthContext) as any;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "test-1",
      text: "Hello! How can I help you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sent: false,
      senderId: "technician",
      receiverId: "user",
    },
  ]);
  const [otherUserId, setOtherUserId] = useState<string>("");
  const flatListRef = useRef<FlatList<Message>>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Messages state changed:", messages);
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setTimeout(
          () => flatListRef.current?.scrollToEnd({ animated: true }),
          100
        );
      }
    );
    return () => keyboardDidShowListener?.remove();
  }, []);

  // Fetch booking and previous messages
  useEffect(() => {
    const fetchHistory = async () => {
      if (!bookingId || !user || !token) return;
      setLoading(true);
      setError("");
      try {
        // Fetch booking to get the other user's ID
        const res = await axios.get(`${API_URL}/${bookingId}`);
        const booking = res.data as any;
        let otherId = "";
        if (user.role === "technician") {
          otherId = booking.customer?._id;
        } else {
          otherId = booking.technician?._id;
        }
        setOtherUserId(otherId);
        // Fetch previous messages
        if (otherId) {
          const msgRes = await axios.get(`${MESSAGES_URL}/${otherId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setMessages(
            (msgRes.data as any[]).map((msg: any) => ({
              id: msg._id,
              text: msg.message,
              time: new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              sent: msg.sender._id === user.id,
              senderId: msg.sender._id,
              receiverId: msg.receiver._id,
            }))
          );
        }
      } catch (err) {
        setError("Failed to load chat history.");
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [bookingId, user, token]);

  useEffect(() => {
    if (!bookingId || !user) return;
    // Join chat room
    socket.emit("join_chat", { bookingId, userId: user.id });
    // Listen for incoming messages
    socket.on("receive_chat_message", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: msg.message,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          sent: msg.senderId === user.id,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
        },
      ]);
    });
    return () => {
      socket.off("receive_chat_message");
    };
  }, [bookingId, user]);

  const handleSend = () => {
    if (!input.trim()) return;

    console.log("Sending message:", input.trim());

    // Add message to local state immediately for testing
    const newMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sent: true,
      senderId: user?.id || "user",
      receiverId: otherUserId || "technician",
    };

    console.log("New message object:", newMessage);

    setMessages((prev) => {
      const updatedMessages = [...prev, newMessage];
      console.log("Updated messages array:", updatedMessages);
      return updatedMessages;
    });

    // Try to send via socket if available
    if (bookingId && user) {
      try {
        socket.emit("send_chat_message", {
          bookingId,
          senderId: user.id,
          receiverId: otherUserId,
          message: input.trim(),
        });
      } catch (error) {
        console.log("Socket error:", error);
      }
    }

    setInput("");
  };

  const renderMessage = ({ item }: { item: Message }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.sent ? styles.sentContainer : styles.receivedContainer,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            item.sent ? styles.sentBubble : styles.receivedBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              item.sent ? styles.sentText : styles.receivedText,
            ]}
          >
            {item.text}
          </Text>
          <Text
            style={[
              styles.messageTime,
              item.sent ? styles.sentTime : styles.receivedTime,
            ]}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={24} color="#374151" />
            </TouchableOpacity>

            <Image
              source={
                avatar && typeof avatar === "string" && avatar.trim() !== ""
                  ? { uri: avatar }
                  : require("@/assets/images/technician_sample.jpg")
              }
              style={styles.avatar}
            />

            <View style={styles.headerInfo}>
              <Text style={styles.headerName}>
                {name && typeof name === "string" ? name : "Milan Mistri"}
              </Text>
              <Text style={styles.headerStatus}>Online</Text>
            </View>

            <TouchableOpacity style={styles.callButton}>
              <Feather name="phone" size={20} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#3b82f6"
              style={{ marginTop: 40 }}
            />
          ) : error ? (
            <Text
              style={{ color: "#dc2626", textAlign: "center", marginTop: 40 }}
            >
              {error}
            </Text>
          ) : (
            <>
              <View style={styles.messagesContainer}>
                <FlatList
                  ref={flatListRef}
                  data={messages}
                  keyExtractor={(item) => item.id}
                  renderItem={renderMessage}
                  contentContainerStyle={styles.messagesList}
                  showsVerticalScrollIndicator={false}
                  onContentSizeChange={() =>
                    flatListRef.current?.scrollToEnd({ animated: false })
                  }
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type a message..."
                    placeholderTextColor="#9ca3af"
                    multiline
                    maxLength={1000}
                  />
                </View>
                {input.trim() ? (
                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleSend}
                  >
                    <Feather name="send" size={18} color="#ffffff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.attachButton}>
                    <Feather name="paperclip" size={18} color="#6b7280" />
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontFamily: fonts.semiBold || fonts.bold,
    color: "#111827",
  },
  headerStatus: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: "#6b7280",
    marginTop: 2,
  },
  callButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#eff6ff",
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  messagesList: {
    paddingVertical: 16,
  },
  messageContainer: {
    paddingHorizontal: 16,
    marginVertical: 3,
  },
  sentContainer: {
    alignItems: "flex-end",
  },
  receivedContainer: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "75%",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sentBubble: {
    backgroundColor: "#3b82f6",
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 15,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginBottom: 4,
  },
  sentText: {
    color: "#ffffff",
  },
  receivedText: {
    color: "#111827",
  },
  messageTime: {
    fontSize: 11,
    fontFamily: fonts.regular,
    alignSelf: "flex-end",
  },
  sentTime: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  receivedTime: {
    color: "#9ca3af",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 40,
    maxHeight: 100,
    justifyContent: "center",
  },
  textInput: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: "#111827",
    textAlignVertical: "center",
    paddingVertical: Platform.OS === "ios" ? 2 : 0,
  },
  sendButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  attachButton: {
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
