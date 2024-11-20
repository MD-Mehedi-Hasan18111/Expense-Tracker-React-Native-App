import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomPicker from "./CustomPicker";

const TransactionFilter = () => {
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const monthOptions = [
    { label: "January", value: "jan" },
    { label: "February", value: "feb" },
    { label: "March", value: "mar" },
    // Add more months
  ];

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Food", value: "food" },
    { label: "Salary", value: "salary" },
    { label: "Subscription", value: "subscription" },
    { label: "Movie", value: "Movie" },
    // Add more filters
  ];

  return (
    <View style={styles.container}>
      {/* <CustomPicker
        options={monthOptions}
        selectedValue={selectedMonth}
        onValueChange={(value) => setSelectedMonth(value)}
      /> */}
      <View style={{ flexDirection: "row", alignItems: 'center', columnGap: 3 }}>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>Filter by Category: </Text>
        <CustomPicker
          options={filterOptions}
          selectedValue={selectedFilter}
          onValueChange={(value) => setSelectedFilter(value)}
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
