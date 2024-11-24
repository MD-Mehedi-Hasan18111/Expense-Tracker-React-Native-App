import React from "react";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Settings", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="currency-setting"
        options={{ title: "Currency Settings", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="appearance"
        options={{ title: "Appearance", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="manage-transaction"
        options={{ title: "Manage Transaction", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="reset-data"
        options={{ title: "Reset Data", headerShadowVisible: false }}
      />
    </Stack>
  );
}
