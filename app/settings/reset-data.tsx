import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTransactions } from "../../hooks/useTransactions";
import { useRouter } from "expo-router";

export default function ResetDataScreen() {
  const { setTransactions } = useTransactions();
  const router = useRouter();
  const resetData = async () => {
    try {
      await AsyncStorage.removeItem("transactions");
      Alert.alert("Success", "All Transactions has been reset.");
      setTransactions([]);
      router.back();
    } catch (error) {
      console.error("Failed to reset data:", error);
      Alert.alert("Error", "An error occurred while resetting the data.");
    }
  };

  const handleResetData = () => {
    Alert.alert(
      "Confirm Reset",
      "Are you sure you want to reset all data? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Reset", style: "destructive", onPress: resetData },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.warningIcon}>
        <Text style={styles.iconText}>⚠️</Text>
      </View>
      <Text style={styles.title}>Reset All Data</Text>
      <Text style={styles.description}>
        Resetting your data will delete all transactions. This action cannot be
        undone. Please proceed with caution.
      </Text>
      <TouchableOpacity style={styles.resetButton} onPress={handleResetData}>
        <Text style={styles.resetButtonText}>Reset Data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#ecf0f1",
  },
  warningIcon: {
    marginBottom: 20,
  },
  iconText: {
    fontSize: 50,
    color: "#d9534f",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#6c757d",
    marginBottom: 30,
    lineHeight: 22,
  },
  resetButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 15,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    borderColor: "#6c757d",
    borderWidth: 1,
  },
  cancelButtonText: {
    color: "#6c757d",
    fontSize: 16,
    fontWeight: "bold",
  },
});
