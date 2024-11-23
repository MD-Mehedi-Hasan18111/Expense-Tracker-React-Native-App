import React from "react";
import { Button, Text, View } from "react-native";
import { useRouter } from "expo-router";

const SettingsScreen = () => {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is Settings Screen.</Text>
      <Button
        title="Manage Transaction"
        onPress={() => router.push("/settings/manage-transaction")}
      />
    </View>
  );
};

export default SettingsScreen;
