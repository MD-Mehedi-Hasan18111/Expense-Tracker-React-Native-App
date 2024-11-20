import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [date, setDate] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const handleDateChange = (event: any, newDate: any) => {
    setShowPicker(false);
    if (newDate) {
      setSelectedDate(newDate);
      const formattedDate = newDate.toISOString().split("T")[0];
      setDate(formattedDate);
    }
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Function to handle saving transaction to AsyncStorage
  const handleSaveTransaction = async () => {
    if (!amount || !category || !description || !date) {
      Alert.alert("Please fill all fields.");
      return;
    }

    const newTransaction: ITransaction = {
      id: `${Date.now()}-${Math.random()}`, // Simple ID generation
      amount,
      category,
      description,
      transactionType,
      date,
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
      setDate("");

      // Retrieve the latest transactions and update state
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Error saving transaction:", error);
      Alert.alert("Failed to save transaction.");
    } finally {
      setIsLoading(false);
    }
  };

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
      <View style={{ rowGap: 10 }}>
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
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Travel" value="travel" />
            <Picker.Item label="Shopping" value="shopping" />
            <Picker.Item label="Salary" value="salary" />
          </Picker>
        </View>

        <TextInput
          placeholder="Enter Description"
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor:
                transactionType === "expense" ? "purple" : "#ccc",
              padding: 10,
              borderRadius: 5,
              flex: 1,
              marginRight: 5,
            }}
            onPress={() => setTransactionType("expense")}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: transactionType === "income" ? "purple" : "#ccc",
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

        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 5,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: date ? "#000" : "#888" }}>
            {date || "Enter Date (YYYY-MM-DD)"}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "calendar"}
            onChange={handleDateChange}
          />
        )}

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
