import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons"; // Assuming you're using this icon library
import { Table, Row, Rows } from "react-native-table-component";
import moment from "moment";
import { useCurrency } from "../../hooks/useCurrency";
import { useTheme } from "../../hooks/useTheme";

const PreviewBudgets = () => {
  const { currency } = useCurrency();
  const { primaryColor } = useTheme();

  const [budgets, setBudgets] = useState<
    {
      category: string;
      type: string;
      amount: number;
      startDate: string;
      endDate: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const storedBudgets = await AsyncStorage.getItem("budgets");
        if (storedBudgets) {
          setBudgets(JSON.parse(storedBudgets));
        }
      } catch (error) {
        console.error("Failed to fetch budgets:", error);
      }
    };

    fetchBudgets();
  }, []);

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Use moment directly with the Date objects or ISO strings
    const formattedStartDate = moment(start).format("Do MMM YYYY");
    const formattedEndDate = moment(end).format("Do MMM YYYY");

    return `${formattedStartDate} to ${formattedEndDate}`;
  };

  const deleteBudget = async (category: string, type: string) => {
    try {
      const updatedBudgets = budgets.filter(
        (budget) => budget.category !== category || budget.type !== type
      );

      await AsyncStorage.setItem("budgets", JSON.stringify(updatedBudgets));
      setBudgets(updatedBudgets);
    } catch (error) {
      console.error("Failed to delete budget:", error);
    }
  };

  const tableHead = ["Category", "Duration", "Amount", "Action"];
  const tableData = budgets.map((item) => [
    item.category,
    calculateDuration(item.startDate, item.endDate),
    `${currency} ${item.amount}`,
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteBudget(item.category, item.type)}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>,
  ]);

  return (
    <View style={styles.container}>
      {budgets?.length === 0 ? (
        <View style={styles.noBudgetsContainer}>
          <Icon name="warning" size={50} color="#FF9800" />
          <Text style={styles.noBudgetsText}>You don't have budget yet!</Text>
        </View>
      ) : (
        <Table borderStyle={{ borderWidth: 1, borderColor: "#c8e1ff" }}>
          <Row
            data={tableHead}
            style={{ backgroundColor: primaryColor }}
            textStyle={{
              color: "#fff",
              fontWeight: "600",
              textAlign: "center",
              padding: 10,
            }}
          />
          <Rows
            data={tableData}
            textStyle={{ padding: 10, textAlign: "center" }}
          />
        </Table>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  noBudgetsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 150,
  },
  noBudgetsText: {
    fontSize: 18,
    color: "#888",
    marginTop: 10,
  },
});

export default PreviewBudgets;
