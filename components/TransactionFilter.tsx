import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomPicker from "./CustomPicker";

interface IComponentProps {
  selectedFilter: {
    label: string;
    value: string;
  };
  setSelectedFilter: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: string;
    }>
  >;
}

const TransactionFilter: React.FC<IComponentProps> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  // const [selectedFilter, setSelectedFilter] = useState("All");

  const monthOptions = [
    { label: "January", value: "jan" },
    { label: "February", value: "feb" },
    { label: "March", value: "mar" },
    // Add more months
  ];

  const filterOptions = [
    { label: "All", value: "" },
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
    <View style={styles.container}>
      {/* <CustomPicker
        options={monthOptions}
        selectedValue={selectedMonth}
        onValueChange={(value) => setSelectedMonth(value)}
      /> */}
      <View
        style={{ flexDirection: "row", alignItems: "center", columnGap: 3 }}
      >
        <Text style={{ fontSize: 16, fontWeight: 500 }}>
          Filter by Category:{" "}
        </Text>
        <CustomPicker
          options={filterOptions}
          selectedValue={selectedFilter}
          onValueChange={setSelectedFilter}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});

export default TransactionFilter;
