import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { useTransactions } from "../hooks/useTransactions";
import { useTheme } from "../hooks/useTheme";
import PreviewBudgets from "../components/PreviewBudget";

interface ITransaction {
  id: string;
  amount: string;
  category: string;
  description: string;
  transactionType: "expense" | "income";
  date: string;
}

const AddScreen = () => {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState<"expense" | "income">(
    "expense"
  );
  const { transactions, setTransactions } = useTransactions();
  const { primaryColor } = useTheme();

  // Calculate Income and Expenses totals
  const incomeTotal = transactions
    .filter((transaction) => transaction.transactionType === "income")
    .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
  const expensesTotal = transactions
    .filter((transaction) => transaction.transactionType === "expense")
    .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Function to handle saving transaction to AsyncStorage
  const handleSaveTransaction = async () => {
    if (!amount || !category || !description) {
      Alert.alert("Please fill all fields.");
      return;
    }

    if (
      incomeTotal - expensesTotal < Number(amount) &&
      transactionType === "expense"
    ) {
      Alert.alert("You have not sufficient balance to add Expense");
      return;
    }

    const newTransaction: ITransaction = {
      id: `${Date.now()}-${Math.random()}`, // Simple ID generation
      amount,
      category,
      description,
      transactionType,
      date: moment().format(),
    };

    try {
      setIsLoading(true);

      // Retrieve existing transactions from AsyncStorage
      const existingTransactions = await AsyncStorage.getItem("transactions");
      const parsedTransactions: ITransaction[] = existingTransactions
        ? JSON.parse(existingTransactions)
        : [];

      // Update the transactions array
      const updatedTransactions = [...parsedTransactions, newTransaction];

      // Save updated transactions back to AsyncStorage
      await AsyncStorage.setItem(
        "transactions",
        JSON.stringify(updatedTransactions)
      );

      router.push("/transaction");

      // Clear input fields
      setAmount("");
      setCategory("");
      setDescription("");
      setTransactionType("expense");
    } catch (error) {
      console.error("Error saving transaction:", error);
      Alert.alert("Failed to save transaction.");
    } finally {
      setIsLoading(false);
    }
  };

  const transactionCategories = [
    { label: "Select Transaction Category", value: "" },
    { label: "Food", value: "food", transactionTypes: "expense" },
    { label: "Shopping", value: "shopping", transactionTypes: "expense" },
    { label: "Travel", value: "travel", transactionTypes: "expense" },
    { label: "Education", value: "education", transactionTypes: "expense" },
    { label: "Salary", value: "salary", transactionTypes: "income" },
    { label: "Revenue", value: "revenue", transactionTypes: "income" },
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
    { label: "Freelance", value: "freelance", transactionTypes: "income" },
    { label: "Commission", value: "commission", transactionTypes: "income" },
    { label: "Bonus", value: "bonus", transactionTypes: "income" },
  ];

  const [screenName, setScreenName] = useState<
    "add-transaction" | "view-budgets"
  >("add-transaction");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        padding: 20,
      }}
    >
      {/* Tabs Section */}
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => setScreenName("add-transaction")}
          style={{
            flex: 1,
            padding: 10,
            backgroundColor:
              screenName === "add-transaction" ? primaryColor : "#ddd",
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: screenName === "add-transaction" ? "#fff" : "#000",
            }}
          >
            Add Transaction
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setScreenName("view-budgets")}
          style={{
            flex: 1,
            padding: 10,
            backgroundColor:
              screenName === "view-budgets" ? primaryColor : "#ddd",
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{ color: screenName === "view-budgets" ? "#fff" : "#000" }}
          >
            View Budgets
          </Text>
        </TouchableOpacity>
      </View>

      {screenName === "add-transaction" ? (
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              marginBottom: 30,
              textAlign: "center",
              fontWeight: "700",
            }}
          >
            Add Transaction
          </Text>

          {/* Transaction Form */}
          <View style={{ rowGap: 12 }}>
            <TextInput
              placeholder="Enter Amount"
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                borderRadius: 5,
                marginBottom: 15,
              }}
              value={amount}
              onChangeText={setAmount}
            />

            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                paddingHorizontal: 4,
                borderRadius: 5,
                marginBottom: 15,
              }}
            >
              <Picker
                selectedValue={`${category}-${transactionType}`}
                onValueChange={(itemValue) => {
                  setCategory(itemValue?.split("-")[0]);
                  setTransactionType(
                    itemValue?.split("-")[1] as "expense" | "income"
                  );
                }}
                style={{
                  height: "auto",
                  width: "100%",
                }}
              >
                {transactionCategories?.map((category) => {
                  return (
                    <Picker.Item
                      key={category.value}
                      label={`${category.label} ${
                        category.transactionTypes
                          ? `(${
                              category.transactionTypes
                                .charAt(0)
                                .toUpperCase() +
                              category.transactionTypes.slice(1).toLowerCase()
                            })`
                          : ""
                      }`}
                      value={`${category.value}-${category.transactionTypes}`}
                      style={{ textTransform: "capitalize" }}
                    />
                  );
                })}
              </Picker>
            </View>

            <TextInput
              placeholder="Write transaction description"
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                borderRadius: 5,
                marginBottom: 15,
              }}
              value={description}
              onChangeText={setDescription}
            />

            <TouchableOpacity
              style={{
                backgroundColor: primaryColor,
                padding: 10,
                borderRadius: 5,
                marginBottom: 20,
              }}
              onPress={handleSaveTransaction}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {isLoading ? "Loading..." : "Continue"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <PreviewBudgets />
      )}
    </View>
  );
};

export default AddScreen;
