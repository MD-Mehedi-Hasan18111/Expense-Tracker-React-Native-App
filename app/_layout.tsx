import React from "react";
import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function RootLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "purple" : color, fontSize: 12 }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? "purple" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "purple" : color, fontSize: 12 }}>
              Transaction
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="swap-horizontal"
              size={24}
              color={focused ? "purple" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/add")}
            >
              <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "purple" : color, fontSize: 12 }}>
              Statistics
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="pie-chart"
              size={24}
              color={focused ? "purple" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "purple" : color, fontSize: 12 }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="person"
              size={24}
              color={focused ? "purple" : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 15,
    top: -30, // Floating above the tab bar
  },
});
