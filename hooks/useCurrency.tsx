import React, { createContext, useContext, useState, ReactNode } from "react";

interface CurrencyContextProps {
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(
  undefined
);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<string>("BDT");

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
