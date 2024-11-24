import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";

const themes = [
  {
    name: "Purple Theme",
    primary: "#800080",
    secondary: "#D8BFD8",
  },
  {
    name: "Orange Theme",
    primary: "#FF5733",
    secondary: "#FFCBA4",
  },
  {
    name: "Teal Theme",
    primary: "#008080",
    secondary: "#AFEEEE",
  },
  {
    name: "Pink Theme",
    primary: "#FF69B4",
    secondary: "#FFD1DC",
  },
  {
    name: "Coral Theme",
    primary: "#FF7F50",
    secondary: "#FFDAB9",
  },
  {
    name: "Indigo Theme",
    primary: "#4B0082",
    secondary: "#E6E6FA",
  },
  {
    name: "Cyan Theme",
    primary: "#00CED1",
    secondary: "#E0FFFF",
  },
  {
    name: "Peach Theme",
    primary: "#FFB07C",
    secondary: "#FFE5D4",
  },
  {
    name: "Lavender Theme",
    primary: "#9370DB",
    secondary: "#F3E5F5",
  },
  {
    name: "Gold Theme",
    primary: "#DAA520",
    secondary: "#F5DEB3",
  },
];

const AppearanceSettings: React.FC = () => {
  const { primaryColor, secondaryColor, setTheme } = useTheme();

  return (
    <LinearGradient
      colors={[secondaryColor, primaryColor]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.title}>Choose a Theme</Text>
      <View style={styles.themeGrid}>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme.name}
            style={[
              styles.themeOption,
              {
                borderColor:
                  primaryColor === theme.primary ? "#fff" : "transparent",
              },
            ]}
            onPress={() =>
              setTheme({ primary: theme.primary, secondary: theme.secondary })
            }
          >
            <LinearGradient
              colors={[theme.secondary, theme.primary]}
              style={styles.themePreview}
            />
            {primaryColor === theme.primary && (
              <Ionicons
                name="checkmark"
                size={24}
                color="#fff"
                style={styles.checkmark}
              />
            )}
            <Text style={styles.themeLabel}>{theme.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  themeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  themeOption: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: 120,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  themePreview: {
    width: 100,
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
  },
  themeLabel: {
    color: "#fff",
    fontSize: 14,
  },
  checkmark: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});

export default AppearanceSettings;
