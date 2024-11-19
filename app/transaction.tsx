import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import TransactionFilter from "../components/TransactionFilter";

const transactions = [
  {
    id: "1",
    category: "Shopping",
    description: "Buy some grocery",
    amount: "-5120",
    time: "10:00 AM",
    type: "expense",
  },
  {
    id: "2",
    category: "Food",
    description: "Arabian Hut",
    amount: "-532",
    time: "07:30 PM",
    type: "expense",
  },
  {
    id: "3",
    category: "Salary",
    description: "Salary for August",
    amount: "+5000",
    time: "04:30 PM",
    type: "income",
  },
  {
    id: "4",
    category: "Subscription",
    description: "Disney+ Annual..",
    amount: "-1180",
    time: "03:30 PM",
    type: "expense",
  },
  {
    id: "5",
    category: "Fuel",
    description: "kozhikode",
    amount: "-1032",
    time: "07:30 PM",
    type: "expense",
  },
  {
    id: "6",
    category: "Movie",
    description: "Super Cop",
    amount: "-532",
    time: "07:30 PM",
    type: "expense",
  },
  {
    id: "7",
    category: "Food",
    description: "Burger",
    amount: "-150",
    time: "07:30 PM",
    type: "expense",
  },
];

export default function TransactionsScreen() {
  const renderTransaction = ({ item }: { item: (typeof transactions)[0] }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionInfo}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.transactionDetails}>
        <Text
          style={[
            styles.amount,
            item.type === "income" ? styles.income : styles.expense,
          ]}
        >
          {item.amount}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
      </View>

      {/* Filters */}
      <TransactionFilter />

      {/* Transaction List */}
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  list: {
    paddingBottom: 60,
  },
  transactionItem: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  transactionInfo: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  transactionDetails: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  income: {
    color: "#00C853",
  },
  expense: {
    color: "#D32F2F",
  },
  time: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});
