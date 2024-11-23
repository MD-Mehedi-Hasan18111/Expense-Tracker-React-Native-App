import React from "react";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Settings", headerShown: false }}
      />
      <Stack.Screen
        name="manage-transaction"
        options={{ title: "Manage Transaction" }}
      />
    </Stack>
  );
}
