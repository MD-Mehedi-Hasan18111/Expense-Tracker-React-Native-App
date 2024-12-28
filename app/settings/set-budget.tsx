import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../../hooks/useTheme";

const SetBudget = () => {
  const router = useRouter();
  const { primaryColor } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);

  const transactionCategories = [
    { label: "Select Expense Category", value: "" },
    { label: "Food", value: "food", transactionTypes: "expense" },
    { label: "Shopping", value: "shopping", transactionTypes: "expense" },
    { label: "Travel", value: "travel", transactionTypes: "expense" },
    { label: "Education", value: "education", transactionTypes: "expense" },
    { label: "Rent", value: "rent", transactionTypes: "expense" },
    { label: "Utilities", value: "utilities", transactionTypes: "expense" },
    { label: "Healthcare", value: "healthcare", transactionTypes: "expense" },
    {
      label: "Mobile Recharge",
      value: "mobile recharge",
      transactionTypes: "expense",
    },
    { label: "Groceries", value: "groceries", transactionTypes: "expense" },
    {
      label: "Subscriptions",
      value: "subscriptions",
      transactionTypes: "expense",
    },
    { label: "Fitness", value: "fitness", transactionTypes: "expense" },
    { label: "Vehicle", value: "vehicle", transactionTypes: "expense" },
    { label: "Gifts", value: "gifts", transactionTypes: "expense" },
    { label: "Donations", value: "donations", transactionTypes: "expense" },
    { label: "Savings", value: "savings", transactionTypes: "income" },
    { label: "Investments", value: "investments", transactionTypes: "expense" },
    { label: "Tax Payment", value: "tax payment", transactionTypes: "expense" },
    { label: "Loan EMI", value: "loan emi", transactionTypes: "expense" },
    {
      label: "Home Maintenance",
      value: "home maintenance",
      transactionTypes: "expense",
    },
    {
      label: "Office Supplies",
      value: "office supplies",
      transactionTypes: "expense",
    },
    { label: "Furniture", value: "furniture", transactionTypes: "expense" },
    { label: "Electronics", value: "electronics", transactionTypes: "expense" },
    { label: "Clothing", value: "clothing", transactionTypes: "expense" },
    {
      label: "Beauty Products",
      value: "beauty products",
      transactionTypes: "expense",
    },
    { label: "Laundry", value: "laundry", transactionTypes: "expense" },
    { label: "Parking", value: "parking", transactionTypes: "expense" },
    {
      label: "Toll Charges",
      value: "toll charges",
      transactionTypes: "expense",
    },
    {
      label: "Hobby Materials",
      value: "hobby materials",
      transactionTypes: "expense",
    },
    { label: "Pet Care", value: "pet care", transactionTypes: "expense" },
    {
      label: "Emergency Fund",
      value: "emergency fund",
      transactionTypes: "expense",
    },
    {
      label: "Holiday Trip",
      value: "holiday trip",
      transactionTypes: "expense",
    },
    { label: "Party", value: "party", transactionTypes: "expense" },
    {
      label: "Courier Services",
      value: "courier services",
      transactionTypes: "expense",
    },
    {
      label: "Business Expenses",
      value: "business expenses",
      transactionTypes: "expense",
    },
  ];

  const handleSaveBudget = async () => {
    if (!selectedCategory || !budgetAmount || !startDate || !endDate) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const newBudget = {
      category: selectedCategory,
      startDate,
      endDate,
      amount: parseFloat(budgetAmount),
    };

    try {
      const existingBudgets = await AsyncStorage.getItem("budgets");
      const budgets = existingBudgets ? JSON.parse(existingBudgets) : [];
      budgets.push(newBudget);

      await AsyncStorage.setItem("budgets", JSON.stringify(budgets));
      Alert.alert("Success", "Budget saved successfully!");
      setSelectedCategory("");
      setBudgetAmount("");
      setStartDate(new Date());
      setEndDate(new Date());
    } catch (error) {
      Alert.alert("Error", "Failed to save budget.");
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#ccc",
          paddingHorizontal: 0,
          borderRadius: 5,
          marginBottom: 15,
        }}
      >
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
          }}
          style={{
            height: 54,
            width: "100%",
          }}
        >
          {transactionCategories?.map((category) => {
            return (
              <Picker.Item
                key={category.value}
                label={category.label}
                value={category.label}
                style={{ textTransform: "capitalize" }}
              />
            );
          })}
        </Picker>
      </View>

      <Text style={styles.label}>Expense Duration</Text>

      <View style={styles.datePickerContainer}>
        <Text style={{ marginBottom: 3 }}>Start Date:</Text>
        <TouchableOpacity
          onPress={() => setIsStartDatePickerVisible(true)}
          style={styles.dateButton}
        >
          <Text>{startDate.toDateString()}</Text>
        </TouchableOpacity>
        {isStartDatePickerVisible && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setIsStartDatePickerVisible(false);
              if (selectedDate) setStartDate(selectedDate);
            }}
          />
        )}
      </View>

      <View style={styles.datePickerContainer}>
        <Text style={{ marginBottom: 3 }}>End Date:</Text>
        <TouchableOpacity
          onPress={() => setIsEndDatePickerVisible(true)}
          style={styles.dateButton}
        >
          <Text>{endDate.toDateString()}</Text>
        </TouchableOpacity>
        {isEndDatePickerVisible && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setIsEndDatePickerVisible(false);
              if (selectedDate) setEndDate(selectedDate);
            }}
          />
        )}
      </View>

      <Text style={styles.label}>Budget Amount</Text>
      <TextInput
        value={budgetAmount}
        onChangeText={setBudgetAmount}
        keyboardType="numeric"
        placeholder="Enter amount"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSaveBudget}
        style={[styles.button, { backgroundColor: primaryColor }]}
      >
        Save Budget
      </Button>
      <Button
        mode="outlined"
        onPress={() => router.push("/settings/view-budget")}
        style={[
          styles.button,
          styles.secondaryButton,
          { borderColor: primaryColor },
        ]}
        labelStyle={{ color: primaryColor }}
      >
        View Budgets
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  secondaryButton: {
    // backgroundColor: "#fff",
    // borderColor: "#6200ee",
    borderWidth: 1,
  },
});

export default SetBudget;
