import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddScreen = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense"); // 'expense' or 'income'
  const [date, setDate] = useState(""); // Date in string format
  const [showPicker, setShowPicker] = useState(false); // Controls visibility of the picker
  const [selectedDate, setSelectedDate] = useState(new Date()); // Stores the selected Date object

  const handleDateChange = (event: any, newDate: any) => {
    setShowPicker(false); // Close the picker
    if (newDate) {
      setSelectedDate(newDate);
      const formattedDate = newDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      setDate(formattedDate);
    }
  };

  const handleContinue = () => {
    console.log({
      amount,
      category,
      description,
      type,
      date,
    });
    alert("Transaction saved!");
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
          fontWeight: 700,
        }}
      >
        Add Transaction
      </Text>

      <View style={{ rowGap: 10 }}>
        {/* Input for Amount */}
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

        {/* Select Input for Category */}
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
              height: 'auto',
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

        {/* Input for Description */}
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

        {/* Select Input for Expense or Income */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: type === "expense" ? "purple" : "#ccc",
              padding: 10,
              borderRadius: 5,
              flex: 1,
              marginRight: 5,
            }}
            onPress={() => setType("expense")}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: type === "income" ? "purple" : "#ccc",
              padding: 10,
              borderRadius: 5,
              flex: 1,
              marginLeft: 5,
            }}
            onPress={() => setType("income")}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>Income</Text>
          </TouchableOpacity>
        </View>

        {/* Date Picker Input */}
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

        {/* Show DateTimePicker only when `showPicker` is true */}
        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "calendar"}
            onChange={handleDateChange}
          />
        )}

        {/* Continue Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "purple",
            padding: 10,
            borderRadius: 5,
            marginBottom: 20,
          }}
          onPress={handleContinue}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddScreen;
