import BackButton from "@/components/BackButton";
import { colors, fonts } from "@/constants/theme";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PaymentMethod {
  id: string;
  type: "card" | "bank" | "wallet";
  name: string;
  lastFour?: string;
  expiryDate?: string;
  bankName?: string;
  accountNumber?: string;
  isDefault: boolean;
}

const PaymentMethodsScreen = () => {
  const navigation = useNavigation();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const handleAddPaymentMethod = () => {
    Alert.alert(
      "Add Payment Method",
      "This feature will allow you to add a new payment method. Coming soon!",
      [{ text: "OK" }]
    );
  };

  const handleEditPaymentMethod = (method: PaymentMethod) => {
    Alert.alert("Edit Payment Method", `Edit payment method: ${method.name}`, [
      { text: "OK" },
    ]);
  };

  const handleDeletePaymentMethod = (method: PaymentMethod) => {
    Alert.alert(
      "Delete Payment Method",
      `Are you sure you want to delete "${method.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setPaymentMethods(
              paymentMethods.filter((pm) => pm.id !== method.id)
            );
          },
        },
      ]
    );
  };

  const handleSetDefault = (method: PaymentMethod) => {
    setPaymentMethods(
      paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === method.id,
      }))
    );
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "card":
        return <Feather name="credit-card" size={24} color={colors.primary} />;
      case "bank":
        return (
          <MaterialIcons
            name="account-balance"
            size={24}
            color={colors.success}
          />
        );
      case "wallet":
        return (
          <MaterialIcons
            name="account-balance-wallet"
            size={24}
            color={colors.primary}
          />
        );
      default:
        return <Feather name="credit-card" size={24} color={colors.primary} />;
    }
  };

  const getPaymentTypeLabel = (type: string) => {
    switch (type) {
      case "card":
        return "Credit/Debit Card";
      case "bank":
        return "Bank Account";
      case "wallet":
        return "Digital Wallet";
      default:
        return "Payment Method";
    }
  };

  const renderPaymentMethod = (method: PaymentMethod) => (
    <View key={method.id} style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.paymentInfo}>
          <View style={styles.paymentIcon}>{getPaymentIcon(method.type)}</View>
          <View style={styles.paymentDetails}>
            <Text style={styles.paymentName}>{method.name}</Text>
            <Text style={styles.paymentType}>
              {getPaymentTypeLabel(method.type)}
            </Text>
            {method.lastFour && (
              <Text style={styles.paymentNumber}>•••• {method.lastFour}</Text>
            )}
            {method.expiryDate && (
              <Text style={styles.paymentExpiry}>
                Expires {method.expiryDate}
              </Text>
            )}
            {method.bankName && (
              <Text style={styles.paymentBank}>{method.bankName}</Text>
            )}
          </View>
        </View>
        <View style={styles.paymentActions}>
          {method.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>Default</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEditPaymentMethod(method)}
            activeOpacity={0.7}
          >
            <Feather name="edit-2" size={16} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeletePaymentMethod(method)}
            activeOpacity={0.7}
          >
            <Feather name="trash-2" size={16} color={colors.rose} />
          </TouchableOpacity>
        </View>
      </View>

      {!method.isDefault && (
        <TouchableOpacity
          style={styles.setDefaultButton}
          onPress={() => handleSetDefault(method)}
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
        <Text style={styles.title}>Payment Methods</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {paymentMethods.length > 0 ? (
          <View style={styles.paymentMethodsList}>
            {paymentMethods.map(renderPaymentMethod)}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Feather name="credit-card" size={64} color={colors.neutral400} />
            <Text style={styles.emptyStateTitle}>No Payment Methods</Text>
            <Text style={styles.emptyStateMessage}>
              You haven't added any payment methods yet. Add your first payment
              method to get started.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddPaymentMethod}
          activeOpacity={0.8}
        >
          <Feather name="plus" size={20} color="#ffffff" />
          <Text style={styles.addButtonText}>Add Payment Method</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentMethodsScreen;

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
  paymentMethodsList: {
    marginTop: 20,
  },
  paymentCard: {
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
  paymentHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  paymentInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.neutral100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentName: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: "#111827",
    marginBottom: 2,
  },
  paymentType: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: "#6b7280",
    marginBottom: 2,
  },
  paymentNumber: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: "#374151",
    marginBottom: 2,
  },
  paymentExpiry: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: "#6b7280",
  },
  paymentBank: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: "#374151",
  },
  paymentActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  defaultBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontFamily: fonts.medium,
    color: "#ffffff",
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  setDefaultButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: colors.neutral100,
    marginTop: 12,
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
});
