import React from "react";
import {
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useTransactions } from "../hooks/useTransactions";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
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

// Helper function to generate random colors
const getRandomColor = () => {
  let color;
  do {
    color =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
  } while (color.toLowerCase() === "#ffffff");
  return color;
};

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

const StatisticsScreen = () => {
  const screenWidth = Dimensions.get("window").width;
  const { currency } = useCurrency();
  const { transactions } = useTransactions();
  const { primaryColor } = useTheme();

  const processDataForChart = (transactions: ITransaction[]) => {
    const categoryStats = transactions.reduce((acc, t) => {
      const key = `${t.category}-${t.transactionType}`;
      if (!acc[key]) {
        acc[key] = {
          name: t.category,
          transactionType: t.transactionType,
          amount: 0,
        };
      }
      acc[key].amount += parseFloat(t.amount);
      return acc;
    }, {} as Record<string, { name: string; transactionType: "income" | "expense"; amount: number }>);

    return Object.values(categoryStats);
  };

  const chartData = processDataForChart(transactions);

  const finalChartData = chartData.map((item) => ({
    name: item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase(),
    amount: item.amount,
    color: getRandomColor(),
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  }));

  const renderStatistics = ({ item }: { item: (typeof chartData)[0] }) => (
    <SafeAreaView
      style={{
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 16,
            color: primaryColor,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {item.name}
        </Text>
        <Text style={{ textTransform: "capitalize" }}>
          <Text style={{ fontWeight: 600 }}>Transaction Type:</Text>{" "}
          {item.transactionType}
        </Text>
        <Text>
          Total Balance: {formatNumberWithCommas(Number(item.amount))}{" "}
          {currency}
        </Text>
      </View>
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
    </SafeAreaView>
  );

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 16, backgroundColor: "#ecf0f1" }}
    >
      {chartData?.length && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: primaryColor }}
          >
            Statistics
          </Text>
        </View>
      )}

      {/* When no statistics available */}
      {chartData?.length === 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 150,
          }}
        >
          <Image
            source={{ uri: "https://i.ibb.co.com/sKkxcGp/no-statistics.png" }}
            style={{
              height: 300,
              width: 300,
              marginHorizontal: "auto",
              borderRadius: 20,
            }}
          />
        </View>
      )}

      {/* Pie Chart */}
      {chartData?.length !== 0 && (
        <PieChart
          data={finalChartData}
          width={screenWidth - 40} // Adjust width for padding
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          }}
          accessor={"amount"}
          backgroundColor={"#fff"}
          paddingLeft={"10"}
          center={[5, 0]}
          style={{ borderRadius: 15 }}
        />
      )}

      {/* Statistics List */}
      <FlatList
        data={chartData}
        renderItem={renderStatistics}
        keyExtractor={(item, index) =>
          `${item.name}-${item.transactionType}-${index}`
        }
        style={{ marginTop: 10, marginBottom: 70 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
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
});
