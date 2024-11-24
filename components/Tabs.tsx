import React from "react";
import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigationState } from "@react-navigation/native";
import { useTheme } from "../hooks/useTheme";

const TabsComponent = () => {
  const router = useRouter();

  function useActiveRouteName() {
    const state = useNavigationState((state) => state);

    const getActiveRoute = (state) => {
      if (!state || !state.routes || state.index === undefined) return null;

      const route = state.routes[state.index];

      // If the route has nested state, recurse to find the active child
      if (route.state) {
        return getActiveRoute(route.state);
      }

      return route.name; // Return the active route name
    };

    return getActiveRoute(state);
  }

  const routeName = useActiveRouteName();
  const hideTabScreens = [
    "currency-setting",
    "appearance",
    "manage-transaction",
  ];

  const { primaryColor } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: hideTabScreens.includes(routeName)
          ? styles.hideTab
          : styles.tabBar,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{ color: focused ? primaryColor : color, fontSize: 12 }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? primaryColor : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{ color: focused ? primaryColor : color, fontSize: 12 }}
            >
              Transaction
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="swap-horizontal"
              size={24}
              color={focused ? primaryColor : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarButton: ({ accessibilityState }) => (
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: accessibilityState?.selected
                  ? primaryColor
                  : "#fff",
                borderWidth: accessibilityState?.selected ? 0 : 1,
                borderColor: accessibilityState?.selected ? "" : primaryColor,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                left: 15,
                top: -30, // Floating above the tab bar
              }}
              onPress={() => router.push("/add")}
            >
              <Ionicons
                name="add"
                size={32}
                color={accessibilityState?.selected ? "white" : primaryColor}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? primaryColor : color, fontSize: 12 }}>
              Statistics
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="pie-chart"
              size={24}
              color={focused ? primaryColor : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? primaryColor : color, fontSize: 12 }}>
              Settings
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="settings"
              size={24}
              color={focused ? primaryColor : color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

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
  hideTab: {
    display: "none",
  },
});

export default TabsComponent;
