import { Budget, SavingsGoal, Transaction } from "./types";

export const TRANSACTIONS: Transaction[] = [
  { id: '1', merchant: 'Starbucks', date: 'Today, 9:41 AM', amount: -5.40, category: 'Dining', icon: 'coffee' },
  { id: '2', merchant: 'Uber Trip', date: 'Yesterday', amount: -15.20, category: 'Transport', icon: 'car' },
  { id: '3', merchant: 'Amazon', date: 'Oct 24', amount: -42.99, category: 'Shopping', icon: 'shopping-bag' },
  { id: '4', merchant: 'Spotify', date: 'Oct 22', amount: -9.99, category: 'Entertainment', icon: 'music' },
  { id: '5', merchant: 'Whole Foods', date: 'Oct 20', amount: -124.50, category: 'Groceries', icon: 'shopping-cart' },
  { id: '6', merchant: 'Netflix', date: 'Oct 19', amount: -15.99, category: 'Entertainment', icon: 'tv' },
];

export const BUDGETS: Budget[] = [
  { id: '1', category: 'Dining', spent: 450, limit: 600, color: '#eab308' }, // Yellow
  { id: '2', category: 'Transport', spent: 90, limit: 200, color: '#22c55e' }, // Green
  { id: '3', category: 'Groceries', spent: 368, limit: 400, color: '#ef4444' }, // Red
  { id: '4', category: 'Shopping', spent: 150, limit: 500, color: '#3b82f6' }, // Blue
];

export const SAVINGS_GOALS: SavingsGoal[] = [
  { id: '1', name: 'Japan Trip', current: 3200, target: 5000, icon: 'plane', color: 'blue' },
  { id: '2', name: 'New Mac', current: 900, target: 3000, icon: 'laptop', color: 'purple' },
  { id: '3', name: 'Wardrobe', current: 850, target: 1000, icon: 'shirt', color: 'pink' },
];

export const CHART_DATA = [
  { name: 'Day 1', value: 3000 },
  { name: 'Day 5', value: 2800 },
  { name: 'Day 10', value: 3500 },
  { name: 'Day 15', value: 2450 },
  { name: 'Day 20', value: 3900 },
  { name: 'Day 25', value: 3200 },
  { name: 'Day 30', value: 4250 },
];