import { colors, fonts } from "@/constants/theme";
import { AuthContext } from "@/context/AuthContext";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  technician: any;
}

const BookingModal = ({ visible, onClose, technician }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useContext(AuthContext) || {};

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (event: any, time?: Date) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      Toast.show({
        type: "error",
        text1: "Please login to book a technician",
      });
      return;
    }

    if (!address.trim()) {
      Toast.show({
        type: "error",
        text1: "Please enter your address",
      });
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDateOnly = new Date(selectedDate);
    selectedDateOnly.setHours(0, 0, 0, 0);

    if (selectedDateOnly <= today) {
      Toast.show({
        type: "error",
        text1: "Please select a date after today",
      });
      return;
    }

    setLoading(true);

    try {
      const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;
      const response = await fetch(`${baseURL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          technicianId: technician._id,
          scheduledDate: selectedDate.toISOString().split("T")[0],
          scheduledTime: `${selectedTime
            .getHours()
            .toString()
            .padStart(2, "0")}:${selectedTime
            .getMinutes()
            .toString()
            .padStart(2, "0")}:00`,
          address: address.trim(),
          description: description.trim() || "Service request",
          serviceType: technician.skills[0] || "plumbing",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Booking successful!",
          text2: "Your booking has been confirmed",
        });
        onClose();
        // Navigate to booking confirmation or bookings list
        router.push("/(profile)/my-bookings");
      } else {
        Toast.show({
          type: "error",
          text1: "Booking failed",
          text2: data.message || "Please try again",
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      Toast.show({
        type: "error",
        text1: "Booking failed",
        text2: "Network error. Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Book Technician</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={24} color={colors.neutral500} />
            </TouchableOpacity>
          </View>

          <View style={styles.technicianInfo}>
            <Text style={styles.technicianName}>{technician?.fullName}</Text>
            <Text style={styles.technicianSkills}>
              {technician?.skills?.join(", ")}
            </Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Select Date & Time</Text>

            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Feather name="calendar" size={20} color={colors.primary} />
              <Text style={styles.dateTimeText}>
                {formatDate(selectedDate)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Feather name="clock" size={20} color={colors.primary} />
              <Text style={styles.dateTimeText}>
                {formatTime(selectedTime)}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Service Details</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your address"
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Describe your service requirement"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.bookButton, loading && styles.bookButtonDisabled]}
            onPress={handleBooking}
            disabled={loading}
          >
            <Text style={styles.bookButtonText}>
              {loading ? "Booking..." : "Confirm Booking"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
              minimumDate={new Date(Date.now() + 24 * 60 * 60 * 1000)} // Tomorrow
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleTimeChange}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default BookingModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },
  closeButton: {
    padding: 4,
  },
  technicianInfo: {
    backgroundColor: colors.neutral50,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  technicianName: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  technicianSkills: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.neutral600,
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  dateTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutral50,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  dateTimeText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
    marginLeft: 12,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.textPrimary,
    textAlignVertical: "top",
  },
  bookButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  bookButtonDisabled: {
    backgroundColor: colors.neutral400,
  },
  bookButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
});
