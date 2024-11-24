import React from "react";
import { TransactionsProvider } from "../hooks/useTransactions";
import { CurrencyProvider } from "../hooks/useCurrency";
import { ThemeProvider } from "../hooks/useTheme";
import TabsComponent from "../components/Tabs";

export default function RootLayout() {
  return (
    <TransactionsProvider>
      <CurrencyProvider>
        <ThemeProvider>
          <TabsComponent />
        </ThemeProvider>
      </CurrencyProvider>
    </TransactionsProvider>
  );
}
