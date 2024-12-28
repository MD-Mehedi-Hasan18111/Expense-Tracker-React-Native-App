import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../hooks/useTheme";

const groupedSettings = [
  {
    sectionTitle: "General",
    data: [
      {
        id: "1",
        title: "Currency Settings",
        icon: "attach-money" as const,
        route: "/settings/currency-setting",
      },
      {
        id: "2",
        title: "Appearance",
        icon: "palette" as const,
        route: "/settings/appearance",
      },
    ],
  },
  {
    sectionTitle: "Transactions",
    data: [
      {
        id: "3",
        title: "Manage Transactions",
        icon: "account-balance-wallet" as const,
        route: "/settings/manage-transaction",
      },
      {
        id: "4",
        title: "Set Budget",
        icon: "donut-large" as const,
        route: "/settings/set-budget",
      },
      {
        id: "5",
        title: "View Budgets",
        icon: "donut-large" as const,
        route: "/settings/view-budget",
      },
    ],
  },
  {
    sectionTitle: "Data Management",
    data: [
      {
        id: "6",
        title: "Reset Data",
        icon: "restore" as const,
        route: "/settings/reset-data",
      },
    ],
  },
];

const SettingsScreen = () => {
  const router = useRouter();

  const { primaryColor, secondaryColor } = useTheme();

  const renderItem = ({
    item,
  }: {
    item: (typeof groupedSettings)[0]["data"][0];
  }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => router.push(item.route)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconWrapper, { backgroundColor: secondaryColor }]}>
        <MaterialIcons name={item.icon} size={28} color={primaryColor} />
      </View>
      <Text style={styles.optionText}>{item.title}</Text>
      <MaterialIcons name="chevron-right" size={24} color="#aaa" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={groupedSettings}
        keyExtractor={(section) => section.sectionTitle}
        renderItem={({ item: section }) => (
          <View>
            <Text style={[styles.sectionTitle, { color: primaryColor }]}>
              {section.sectionTitle}
            </Text>
            <FlatList
              data={section.data}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.sectionContent}
            />
          </View>
        )}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  sectionContent: {
    paddingBottom: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  optionText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  separator: {
    height: 20,
  },
});

export default SettingsScreen;
