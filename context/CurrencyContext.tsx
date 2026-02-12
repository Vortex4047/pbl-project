import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { readStorage, writeStorage } from '../utils/storage';

export type Currency = 'INR' | 'USD';
export const SUPPORTED_CURRENCIES: Currency[] = ['INR', 'USD'];

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatCurrency: (amount: number, decimals?: number) => string;
  getCurrencySymbol: () => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = readStorage<unknown>('currency', 'INR');
    return SUPPORTED_CURRENCIES.includes(saved as Currency) ? (saved as Currency) : 'INR';
  });

  useEffect(() => {
    writeStorage('currency', currency);
  }, [currency]);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
  };

  const getCurrencySymbol = () => {
    return currency === 'INR' ? '₹' : '$';
  };

  const formatCurrency = (amount: number, decimals: number = 0) => {
    if (currency === 'INR') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
      }).format(amount);
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
      }).format(amount);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency, getCurrencySymbol }}>
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
