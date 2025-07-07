import BackButton from "@/components/BackButton";
import InputField from "@/components/InputField";
import { colors, fonts } from "@/constants/theme";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Address {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

const SavedAddressesScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleAddAddress = () => {
    setShowAddModal(true);
  };

  const handleSaveAddress = () => {
    if (
      !newAddress.title.trim() ||
      !newAddress.address.trim() ||
      !newAddress.city.trim() ||
      !newAddress.state.trim() ||
      !newAddress.zipCode.trim()
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const address: Address = {
      id: Date.now().toString(),
      title: newAddress.title,
      address: newAddress.address,
      city: newAddress.city,
      state: newAddress.state,
      zipCode: newAddress.zipCode,
      isDefault: addresses.length === 0, // First address becomes default
    };

    setAddresses([...addresses, address]);
    setNewAddress({
      title: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    });
    setShowAddModal(false);
  };

  const handleCancelAdd = () => {
    setNewAddress({
      title: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    });
    setShowAddModal(false);
  };

  const handleEditAddress = (address: Address) => {
    Alert.alert("Edit Address", `Edit address: ${address.title}`, [
      { text: "OK" },
    ]);
  };

  const handleDeleteAddress = (address: Address) => {
    Alert.alert(
      "Delete Address",
      `Are you sure you want to delete "${address.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedAddresses = addresses.filter(
              (addr) => addr.id !== address.id
            );
            // If we're deleting the default address and there are other addresses, make the first one default
            if (address.isDefault && updatedAddresses.length > 0) {
              updatedAddresses[0].isDefault = true;
            }
            setAddresses(updatedAddresses);
          },
        },
      ]
    );
  };

  const handleSetDefault = (address: Address) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === address.id,
      }))
    );
  };

  const renderAddressItem = (address: Address) => (
    <View key={address.id} style={styles.addressCard}>
      <View style={styles.addressHeader}>
        <View style={styles.addressTitleRow}>
          <Text style={styles.addressTitle}>{address.title}</Text>
          {address.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>Default</Text>
            </View>
          )}
        </View>
        <View style={styles.addressActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEditAddress(address)}
            activeOpacity={0.7}
          >
            <Feather name="edit-2" size={16} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteAddress(address)}
            activeOpacity={0.7}
          >
            <Feather name="trash-2" size={16} color={colors.rose} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.addressDetails}>
        <Text style={styles.addressText}>{address.address}</Text>
        <Text style={styles.addressText}>
          {address.city}, {address.state} {address.zipCode}
        </Text>
      </View>

      {!address.isDefault && (
        <TouchableOpacity
          style={styles.setDefaultButton}
          onPress={() => handleSetDefault(address)}
          activeOpacity={0.7}
        >
          <Text style={styles.setDefaultText}>Set as Default</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BackButton />
        </View>
        <Text style={styles.title}>Saved Addresses</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {addresses.length > 0 ? (
          <View style={styles.addressesList}>
            {addresses.map(renderAddressItem)}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons
              name="location-off"
              size={64}
              color={colors.neutral400}
            />
            <Text style={styles.emptyStateTitle}>No Saved Addresses</Text>
            <Text style={styles.emptyStateMessage}>
              You haven't saved any addresses yet. Add your first address to get
              started.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddAddress}
          activeOpacity={0.8}
        >
          <Feather name="plus" size={20} color="#ffffff" />
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Add Address Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCancelAdd}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={handleCancelAdd}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Address</Text>
            <TouchableOpacity
              onPress={handleSaveAddress}
              style={styles.modalSaveButton}
            >
              <Text style={styles.modalSaveText}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            <InputField
              label="Address Title *"
              value={newAddress.title}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, title: text })
              }
              placeholder="e.g., Home, Office, Vacation Home"
              autoCapitalize="words"
            />

            <InputField
              label="Street Address *"
              value={newAddress.address}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, address: text })
              }
              placeholder="Enter your street address"
              autoCapitalize="words"
            />

            <InputField
              label="City *"
              value={newAddress.city}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, city: text })
              }
              placeholder="Enter your city"
              autoCapitalize="words"
            />

            <InputField
              label="State/Province *"
              value={newAddress.state}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, state: text })
              }
              placeholder="Enter your state or province"
              autoCapitalize="words"
            />

            <InputField
              label="ZIP/Postal Code *"
              value={newAddress.zipCode}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, zipCode: text })
              }
              placeholder="Enter your ZIP or postal code"
              keyboardType="numeric"
            />

            <View style={styles.modalBottomSpacing} />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default SavedAddressesScreen;

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
  addressesList: {
    marginTop: 20,
  },
  addressCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  addressTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: "#111827",
  },
  defaultBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontFamily: fonts.medium,
    color: "#ffffff",
  },
  addressActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  addressDetails: {
    marginBottom: 12,
  },
  addressText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: "#6b7280",
    lineHeight: 20,
  },
  setDefaultButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: colors.neutral100,
  },
  setDefaultText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.primary,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
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
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: fonts.bold,
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 40,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  modalCloseButton: {
    padding: 4,
  },
  modalCloseText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.neutral600,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: "#111827",
  },
  modalSaveButton: {
    padding: 4,
  },
  modalSaveText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalBottomSpacing: {
    height: 40,
  },
});
