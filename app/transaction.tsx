import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import TransactionFilter from "../components/TransactionFilter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import NoTransactions from "../components/NoTransaction";
import moment from "moment";
import { useTransactions } from "../hooks/useTransactions";
import { useCurrency } from "../hooks/useCurrency";

interface ITransaction {
  id: string;
  amount: string;
  category: string;
  description: string;
  transactionType: "expense" | "income";
  date: string;
}

const ITEMS_PER_PAGE = 10;

export default function TransactionsScreen() {
  const { currency } = useCurrency();
  const { transactions, setTransactions } = useTransactions();
  const [filteredTransactions, setFilteredTransactions] = useState<
    ITransaction[]
  >([]);
  const [filterCategory, setFilterCategory] = useState<{
    label: string;
    value: string;
  }>({
    label: "All",
    value: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const getTransactions = async () => {
    try {
      const storedTransactions = await AsyncStorage.getItem("transactions");
      const parsedTransactions = storedTransactions
        ? JSON.parse(storedTransactions)
        : [];

      if (Array.isArray(parsedTransactions)) {
        setTransactions(parsedTransactions.reverse());
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

  const applyFilter = () => {
    if (filterCategory.value !== "") {
      const filtered = transactions.filter(
        (transaction) =>
          transaction.category.toLocaleLowerCase() ===
          filterCategory.value.toLocaleLowerCase()
      );
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  };

  const loadMoreTransactions = () => {
    if (
      loadingMore ||
      currentPage * ITEMS_PER_PAGE >= filteredTransactions.length
    )
      return;

    setLoadingMore(true);
    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1);
      setLoadingMore(false);
    }, 500); // Simulate network delay
  };

  useFocusEffect(
    useCallback(() => {
      getTransactions();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      applyFilter();
    }, [transactions, filterCategory])
  );

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
            item.transactionType === "income" ? styles.income : styles.expense,
          ]}
        >
          {`${item.transactionType === "income" ? "+" : "-"}` +
            formatNumberWithCommas(Number(item.amount))}{" "}
          {currency}
        </Text>
        <Text style={styles.time}>{moment(item.date).format("DD MMM LT")}</Text>
      </View>
    </View>
  );

  const paginatedTransactions = filteredTransactions.slice(
    0,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>All Transactions</Text>
      </View>

      {/* Filters */}
      <TransactionFilter
        selectedFilter={filterCategory}
        setSelectedFilter={setFilterCategory}
      />

      {/* Transaction List */}
      <FlatList
        data={paginatedTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item, index) => item.id || index.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreTransactions}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="large"
              color="purple"
              style={styles.loadingMore}
            />
          ) : null
        }
        ListEmptyComponent={<NoTransactions filterCategory={filterCategory} />}
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
    color: "purple",
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
    textTransform: "capitalize",
  },
  description: {
    fontSize: 12,
    color: "purple",
    marginTop: 4,
    textTransform: "capitalize",
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
  loadingMore: {
    marginVertical: 16,
  },
});
