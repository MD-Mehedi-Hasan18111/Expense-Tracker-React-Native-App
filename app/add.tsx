import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

interface ITransaction {
  id: string;
  amount: string;
  category: string;
  description: string;
  transactionType: string;
  date: string;
}

const AddScreen = () => {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Function to handle saving transaction to AsyncStorage
  const handleSaveTransaction = async () => {
    if (!amount || !category || !description) {
      Alert.alert("Please fill all fields.");
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
      // setDate("");

      // Retrieve the latest transactions and update state
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Error saving transaction:", error);
      Alert.alert("Failed to save transaction.");
    } finally {
      setIsLoading(false);
    }
  };

  const transactionCategories = [
    { label: "Select Transaction Category", value: "" },
    { label: "Food", value: "food" },
    { label: "Shopping", value: "shopping" },
    { label: "Travel", value: "travel" },
    { label: "Education", value: "education" },
    { label: "Salary", value: "salary" },
    { label: "Revenue", value: "revenue" },
    { label: "Rent", value: "rent" },
    { label: "Utilities", value: "utilities" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Mobile Recharge", value: "mobile recharge" },
    { label: "Groceries", value: "groceries" },
    {
      label: "Subscriptions",
      value: "subscriptions",
    },
    { label: "Fitness", value: "fitness" },
    { label: "Vehicle", value: "vehicle" },
    { label: "Gifts", value: "gifts" },
    { label: "Donations", value: "donations" },
    { label: "Savings", value: "savings" },
    { label: "Investments", value: "investments" },
    { label: "Tax Payment", value: "tax payment" },
    { label: "Loan EMI", value: "loan emi" },
    { label: "Home Maintenance", value: "home maintenance" },
    { label: "Office Supplies", value: "office supplies" },
    { label: "Furniture", value: "furniture" },
    { label: "Electronics", value: "electronics" },
    { label: "Clothing", value: "clothing" },
    { label: "Beauty Products", value: "beauty products" },
    { label: "Laundry", value: "laundry" },
    { label: "Parking", value: "parking" },
    { label: "Toll Charges", value: "toll charges" },
    {
      label: "Hobby Materials",
      value: "hobby materials",
    },
    { label: "Pet Care", value: "pet care" },
    { label: "Emergency Fund", value: "emergency fund" },
    { label: "Holiday Trip", value: "holiday trip" },
    { label: "Party", value: "party" },
    { label: "Courier Services", value: "courier services" },
    { label: "Business Expenses", value: "business expenses" },
    { label: "Freelance", value: "freelance" },
    { label: "Commission", value: "commission" },
    { label: "Bonus", value: "bonus" },
  ];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
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
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={{
              height: "auto",
              width: "100%",
            }}
          >
            {transactionCategories?.map((category) => {
              return (
                <Picker.Item
                  key={category.value}
                  label={category.label}
                  value={category.value}
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

        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 16, color: "#000", marginBottom: 10 }}>
            Choose Transaction Type:{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor:
                  transactionType === "expense" ? "purple" : "#aaa",
                padding: 10,
                borderRadius: 5,
                flex: 1,
                marginRight: 5,
              }}
              onPress={() => setTransactionType("expense")}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor:
                  transactionType === "income" ? "purple" : "#aaa",
                padding: 10,
                borderRadius: 5,
                flex: 1,
                marginLeft: 5,
              }}
              onPress={() => setTransactionType("income")}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>Income</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "purple",
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
  );
};

export default AddScreen;
