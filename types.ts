export interface Transaction {
  id: string;
  merchant: string;
  date: string;
  amount: number;
  category: string;
  icon: string;
}

export interface Budget {
  id: string;
  category: string;
  spent: number;
  limit: number;
  color: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  current: number;
  target: number;
  icon: string;
  color: string; // hex or tailwind class fragment
}

export type ViewState = 'dashboard' | 'wallet' | 'planning' | 'settings';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface User {
  name: string;
  email: string;
}