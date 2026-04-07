import React, { createContext, useContext, ReactNode } from 'react';

// Currency is fixed to INR — all financial data in this app is in Indian Rupees.
// The Currency Converter tool handles conversions to other currencies separately.
export type Currency = 'INR';

interface CurrencyContextType {
  currency: Currency;
  formatCurrency: (amount: number, decimals?: number) => string;
  getCurrencySymbol: () => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const currency: Currency = 'INR';

  const getCurrencySymbol = () => '₹';

  const formatCurrency = (amount: number, decimals: number = 0): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    }).format(amount);
  };

  return (
    <CurrencyContext.Provider value={{ currency, formatCurrency, getCurrencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
