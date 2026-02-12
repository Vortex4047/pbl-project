import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, Budget, SavingsGoal } from '../types';
import { TRANSACTIONS as INITIAL_TRANSACTIONS, BUDGETS as INITIAL_BUDGETS, SAVINGS_GOALS as INITIAL_GOALS } from '../constants';
import { generateId } from '../utils/id';
import { readStorage, writeStorage } from '../utils/storage';

interface FinanceContextType {
  transactions: Transaction[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
  updateBudgetSpent: (category: string, amount: number) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state from localStorage or fall back to constants
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const parsed = readStorage<unknown>('transactions', INITIAL_TRANSACTIONS);
    if (Array.isArray(parsed) && parsed.every(t => t && typeof t === 'object' && 'merchant' in t && 'category' in t)) {
      return parsed as Transaction[];
    }
    return INITIAL_TRANSACTIONS;
  });

  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const parsed = readStorage<unknown>('budgets', INITIAL_BUDGETS);
    if (Array.isArray(parsed)) {
      return parsed as Budget[];
    }
    return INITIAL_BUDGETS;
  });

  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(() => {
    const parsed = readStorage<unknown>('savingsGoals', INITIAL_GOALS);
    if (Array.isArray(parsed)) {
      return parsed as SavingsGoal[];
    }
    return INITIAL_GOALS;
  });

  // Persist changes to localStorage
  useEffect(() => {
    writeStorage('transactions', transactions);
  }, [transactions]);

  useEffect(() => {
    writeStorage('budgets', budgets);
  }, [budgets]);

  useEffect(() => {
    writeStorage('savingsGoals', savingsGoals);
  }, [savingsGoals]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: generateId() };
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Automatically update budget spending
    updateBudgetSpent(transaction.category, Math.abs(transaction.amount));
  };

  const addBudget = (budget: Omit<Budget, 'id'>) => {
    const newBudget = { ...budget, id: generateId() };
    setBudgets(prev => [...prev, newBudget]);
  };

  const addSavingsGoal = (goal: Omit<SavingsGoal, 'id'>) => {
    const newGoal = { ...goal, id: generateId() };
    setSavingsGoals(prev => [...prev, newGoal]);
  };

  const updateBudgetSpent = (category: string, amount: number) => {
    setBudgets(prev => prev.map(b => {
      if (b.category.toLowerCase() === category.toLowerCase()) {
        return { ...b, spent: b.spent + amount };
      }
      return b;
    }));
  };

  return (
    <FinanceContext.Provider value={{ 
      transactions, 
      budgets, 
      savingsGoals, 
      addTransaction, 
      addBudget, 
      addSavingsGoal,
      updateBudgetSpent 
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
