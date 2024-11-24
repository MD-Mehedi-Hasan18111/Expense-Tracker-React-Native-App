import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTransactions } from "../../hooks/useTransactions";
import { useCurrency } from "../../hooks/useCurrency";
import { useTheme } from "../../hooks/useTheme";

const TRANSACTIONS_KEY = "transactions";
const ITEMS_PER_PAGE = 10; // Adjust the number of items per page as needed

interface ITransaction {
  id: string;
  amount: string;
  category: string;
  description: string;
  transactionType: "expense" | "income";
  date: string;
}

const ManageTransactionScreen = () => {
  const { transactions, setTransactions } = useTransactions();
  const { currency } = useCurrency();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const storedTransactions = await AsyncStorage.getItem(TRANSACTIONS_KEY);
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        }
      } catch (error) {
        console.error("Failed to load transactions from AsyncStorage", error);
      }
    };

    loadTransactions();
  }, []);

  const updateAsyncStorage = async (updatedTransactions: ITransaction[]) => {
    try {
      await AsyncStorage.setItem(
        TRANSACTIONS_KEY,
        JSON.stringify(updatedTransactions)
      );
    } catch (error) {
      console.error("Failed to update AsyncStorage", error);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const updatedTransactions = transactions.filter(
              (transaction) => transaction.id !== id
            );
            setTransactions(updatedTransactions);
            await updateAsyncStorage(updatedTransactions);
          },
        },
      ]
    );
  };

  const loadMoreTransactions = () => {
    if (loadingMore || currentPage * ITEMS_PER_PAGE >= transactions.length)
      return;

    setLoadingMore(true);
    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1);
      setLoadingMore(false);
    }, 500); // Simulate network delay
  };

  const renderItem = ({ item }: { item: ITransaction }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionDetails}>
        <Text style={[styles.transactionCategory, {color: primaryColor}]}>{item.category}</Text>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text
          style={[
            styles.transactionAmount,
            { color: item.transactionType === "income" ? "green" : "red" },
          ]}
        >
          {item.transactionType === "income" ? "+" : "-"} {item.amount}{" "}
          {currency}
        </Text>
      </View>
      <View style={styles.transactionMeta}>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <MaterialIcons name="delete" size={24} color="#E57373" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Paginate the transactions
  const paginatedTransactions = transactions.slice(
    0,
    currentPage * ITEMS_PER_PAGE
  );

  const { primaryColor } = useTheme();

  return (
    <View style={styles.container}>
      <FlatList
        data={paginatedTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions available.</Text>
        }
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    paddingHorizontal: 20,
  },
  list: {
    paddingVertical: 10,
  },
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  transactionDetails: {
    flex: 2,
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  transactionDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 2,
  },
  transactionMeta: {
    flex: 1,
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  loadingMore: {
    marginVertical: 16,
  },
});

export default ManageTransactionScreen;
