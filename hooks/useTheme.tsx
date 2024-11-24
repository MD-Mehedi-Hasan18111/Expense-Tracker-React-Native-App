import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeContextType = {
  primaryColor: string;
  secondaryColor: string;
  setTheme: (theme: { primary: string; secondary: string }) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState({
    primary: "#800080", // Default primary (Purple)
    secondary: "#D8BFD8", // Default secondary (Light Purple)
  });

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("Appearance");
        if (storedTheme) {
          setThemeState(JSON.parse(storedTheme));
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };

    loadTheme();
  }, []);

  const setTheme = async (theme: { primary: string; secondary: string }) => {
    try {
      setThemeState(theme);
      await AsyncStorage.setItem("Appearance", JSON.stringify(theme));
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        primaryColor: theme.primary,
        secondaryColor: theme.secondary,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
