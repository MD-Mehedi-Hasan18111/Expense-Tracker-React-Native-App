import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

const NoTransactions = ({
  filterCategory,
}: {
  filterCategory: { label: string; value: string };
}) => {
  const router = useRouter();
  const { primaryColor } = useTheme();
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.ibb.co.com/1nBTYTq/no-transaction.png" }}
        style={styles.image}
      />
      <Text style={styles.text}>
        No Transactions{" "}
        {filterCategory.value ? `for ${filterCategory.label}` : "Available"}
      </Text>
      {filterCategory.value === "" && (
        <TouchableOpacity
          style={[
            styles.transactionCreateBtn,
            { backgroundColor: primaryColor },
          ]}
          onPress={() => router.push("/add")}
        >
          <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
            Add Transaction
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NoTransactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
    marginHorizontal: "auto",
    resizeMode: "contain",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  transactionCreateBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    marginTop: 20,
    width: 200,
    marginHorizontal: "auto",
  },
});
