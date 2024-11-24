import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrency } from "../../utils/settings";
import { useCurrency } from "../../hooks/useCurrency";
import { useTheme } from "../../hooks/useTheme";

const availableCurrencies = [
  { id: "1", code: "USD", name: "US Dollar" },
  { id: "2", code: "BDT", name: "Bangladesh Taka" },
  { id: "3", code: "SGD", name: "Singapore Doller" },
  { id: "4", code: "PKR", name: "Pakistan Rupee" },
  { id: "5", code: "EUR", name: "Euro" },
  { id: "6", code: "GBP", name: "British Pound" },
  { id: "7", code: "INR", name: "Indian Rupee" },
  { id: "8", code: "JPY", name: "Japanese Yen" },
];

const CurrencySettingsScreen = () => {
  const { currency, setCurrency } = useCurrency();
  const { primaryColor, secondaryColor } = useTheme();

  const getSelectedCurrency = async () => {
    const selectedCurrency = await getCurrency();
    if (selectedCurrency) {
      setCurrency(selectedCurrency);
    }
  };
  React.useEffect(() => {
    getSelectedCurrency();
  }, []);

  const handleCurrencyChange = async (currencyCode: string) => {
    setCurrency(currencyCode);
    await AsyncStorage.setItem("currency", currencyCode);
  };

  const renderItem = ({ item }: { item: (typeof availableCurrencies)[0] }) => (
    <TouchableOpacity
      style={[
        styles.currencyOption,
        currency === item.code && styles.selectedCurrency,
        { borderColor: primaryColor, backgroundColor: secondaryColor },
      ]}
      onPress={() => handleCurrencyChange(item.code)}
    >
      <Text style={styles.currencyText}>
        {item.name} ({item.code})
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: primaryColor }]}>
        Choose Your Currency
      </Text>
      <FlatList
        data={availableCurrencies}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    // color: "purple",
  },
  list: {
    paddingBottom: 20,
  },
  currencyOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCurrency: {
    // backgroundColor: "#f3e8f9",
    // borderColor: "purple",
    borderWidth: 2,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});

export default CurrencySettingsScreen;
