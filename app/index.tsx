import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import NoTransactions from "../components/NoTransaction";
import moment from "moment";
import { useTransactions } from "../hooks/useTransactions";
import { getCurrency } from "../utils/settings";
import { useCurrency } from "../hooks/useCurrency";
import { useTheme } from "../hooks/useTheme";

interface ITransaction {
  id: string;
  amount: string;
  category: string;
  description: string;
  transactionType: "expense" | "income";
  date: string;
}

const HomeScreen = () => {
  const router = useRouter();
  const { currency } = useCurrency();
  const { primaryColor } = useTheme();

  const { transactions, setTransactions } = useTransactions();
  const [loading, setLoading] = useState<boolean>(true);
  const getTransactions = async () => {
    try {
      const storedTransactions = await AsyncStorage.getItem("transactions");
      const parsedTransactions = storedTransactions
        ? JSON.parse(storedTransactions)
        : [];

      // validate data is an array of transactions
      if (Array.isArray(parsedTransactions)) {
        setTransactions(parsedTransactions);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Failed to retrieve transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTransactions();
    }, [])
  );

  // Time
  const [currentTime, setCurrentTime] = useState(
    moment().format("dddd DD MMM YYYY, h:mm a")
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("dddd DD MMM YYYY, h:mm:ss a"));
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Calculate Income and Expenses totals
  const incomeTotal = transactions
    .filter((transaction) => transaction.transactionType === "income")
    .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
  const expensesTotal = transactions
    .filter((transaction) => transaction.transactionType === "expense")
    .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
  // Helper function to format numbers with commas
  const formatNumberWithCommas = (num: number): string => {
    const numStr = num.toString();
    // Split the number into integer and fractional parts
    const [integerPart, decimalPart] = numStr.split(".");
    // Handle the integer part with Indian number formatting
    const lastThree = integerPart.slice(-3); // Last three digits
    const rest = integerPart.slice(0, -3); // Digits before the last three
    const formattedIntegerPart = rest
      ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
      : lastThree;
    // Append fractional part if it exists
    return decimalPart
      ? `${formattedIntegerPart}.${decimalPart}`
      : formattedIntegerPart;
  };

  // const clearAllTransactions = async () => {
  //   try {
  //     await AsyncStorage.removeItem("transactions");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   clearAllTransactions();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.date, { color: primaryColor }]}>
            {currentTime}
          </Text>
        </View>
      </View>

      {/* Account Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Account Balance</Text>
        <Text style={[styles.balance, { color: primaryColor }]}>
          {formatNumberWithCommas(incomeTotal - expensesTotal)} {currency}
        </Text>

        <View style={styles.incomeExpense}>
          <TouchableOpacity style={styles.incomeBox}>
            <Text style={styles.incomeText}>Income</Text>
            <Text style={styles.incomeAmount}>
              {formatNumberWithCommas(incomeTotal)} {currency}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.expenseBox}>
            <Text style={styles.expenseText}>Expenses</Text>
            <Text style={styles.expenseAmount}>
              {formatNumberWithCommas(expensesTotal)} {currency}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.transactionsHeader}>
        <Text style={styles.transactionsTitle}>Recent Transaction</Text>
        <TouchableOpacity onPress={() => router.push("/transaction")}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions?.slice().reverse()?.slice(0, 6)}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color={primaryColor}
              style={{ marginVertical: 20 }}
            />
          ) : null
        }
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <Text
              style={[
                styles.transactionIcon,
                item.transactionType === "income"
                  ? styles.incomeIcon
                  : styles.expenseIcon,
              ]}
            >
              {item.transactionType === "income" ? (
                <Ionicons name="arrow-up" size={24} />
              ) : (
                <Ionicons name="arrow-down" size={24} />
              )}
            </Text>
            <View>
              <Text style={styles.transactionAmount}>
                {formatNumberWithCommas(Number(item.amount))} {currency}
              </Text>
              <Text
                style={[styles.transactionCategory, { color: primaryColor }]}
              >
                {item.category}
              </Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 50 }}
        ListEmptyComponent={
          <NoTransactions filterCategory={{ label: "All", value: "" }} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#ecf0f1" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: { fontSize: 12 },
  profileContainer: { flexDirection: "row", alignItems: "center" },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
  username: { fontSize: 16, marginLeft: 8 },

  balanceContainer: { marginTop: 20, alignItems: "center" },
  balanceLabel: { fontSize: 14, color: "#000" },
  balance: { fontSize: 32, fontWeight: "bold", marginVertical: 4 },
  incomeExpense: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  incomeBox: {
    flex: 1,
    backgroundColor: "#e0f8e9",
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },
  expenseBox: {
    flex: 1,
    backgroundColor: "#fdecea",
    padding: 16,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: "center",
  },
  incomeText: { color: "#28a745", fontSize: 16 },
  incomeAmount: { color: "#28a745", fontWeight: "bold", fontSize: 20 },
  expenseText: { color: "#dc3545", fontSize: 16 },
  expenseAmount: { color: "#dc3545", fontWeight: "bold", fontSize: 20 },

  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 4,
  },
  transactionsTitle: { fontWeight: "bold", fontSize: 16 },
  viewAll: { color: "#007bff", fontSize: 14 },

  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    marginVertical: 6,
    borderRadius: 8,
  },
  transactionIcon: { marginRight: 16 },
  incomeIcon: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: 4,
    borderRadius: 100,
  },
  expenseIcon: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: 4,
    borderRadius: 100,
  },
  transactionAmount: { fontWeight: "bold", fontSize: 16 },
  transactionCategory: {
    fontSize: 14,
    textTransform: "capitalize",
  },
});

export default HomeScreen;
