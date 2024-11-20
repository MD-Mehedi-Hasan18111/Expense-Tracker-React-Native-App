import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NoTransactions = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.ibb.co.com/1nBTYTq/no-transaction.png" }}
        style={styles.image}
      />
      <Text style={styles.text}>No Transactions Available</Text>
      <TouchableOpacity
        style={styles.transactionCreateBtn}
        onPress={() => router.push("/add")}
      >
        <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
          Create Transaction
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoTransactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
    marginHorizontal: "auto",
    resizeMode: "contain",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  transactionCreateBtn: {
    backgroundColor: "purple",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    marginTop: 20,
    width: 200,
    marginHorizontal: "auto",
  },
});