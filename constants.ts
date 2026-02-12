import { Budget, SavingsGoal, Transaction } from "./types";

export const TRANSACTIONS: Transaction[] = [
  { id: '1', merchant: 'Cafe Coffee Day', date: 'Today, 9:41 AM', amount: -450, category: 'Dining', icon: 'coffee' },
  { id: '2', merchant: 'Ola Cab', date: 'Yesterday', amount: -280, category: 'Transport', icon: 'car' },
  { id: '3', merchant: 'Amazon India', date: 'Oct 24', amount: -3499, category: 'Shopping', icon: 'shopping-bag' },
  { id: '4', merchant: 'Spotify Premium', date: 'Oct 22', amount: -119, category: 'Entertainment', icon: 'music' },
  { id: '5', merchant: 'Big Bazaar', date: 'Oct 20', amount: -2850, category: 'Groceries', icon: 'shopping-cart' },
  { id: '6', merchant: 'Netflix India', date: 'Oct 19', amount: -649, category: 'Entertainment', icon: 'tv' },
  { id: '7', merchant: 'Swiggy', date: 'Oct 18', amount: -580, category: 'Dining', icon: 'coffee' },
  { id: '8', merchant: 'Reliance Digital', date: 'Oct 17', amount: -15999, category: 'Shopping', icon: 'laptop' },
  { id: '9', merchant: 'Metro Station', date: 'Oct 16', amount: -60, category: 'Transport', icon: 'car' },
  { id: '10', merchant: 'Zomato', date: 'Oct 15', amount: -720, category: 'Dining', icon: 'coffee' },
];

export const BUDGETS: Budget[] = [
  { id: '1', category: 'Dining', spent: 12500, limit: 15000, color: '#eab308' }, // Yellow
  { id: '2', category: 'Transport', spent: 3200, limit: 5000, color: '#22c55e' }, // Green
  { id: '3', category: 'Groceries', spent: 8900, limit: 10000, color: '#ef4444' }, // Red
  { id: '4', category: 'Shopping', spent: 18500, limit: 25000, color: '#3b82f6' }, // Blue
  { id: '5', category: 'Entertainment', spent: 2500, limit: 4000, color: '#a855f7' }, // Purple
];

export const SAVINGS_GOALS: SavingsGoal[] = [
  { id: '1', name: 'Goa Trip', current: 45000, target: 80000, icon: 'plane', color: 'blue' },
  { id: '2', name: 'New iPhone', current: 35000, target: 120000, icon: 'laptop', color: 'purple' },
  { id: '3', name: 'Wedding Fund', current: 150000, target: 500000, icon: 'shirt', color: 'pink' },
];

export const CHART_DATA = [
  { name: 'Day 1', value: 85000 },
  { name: 'Day 5', value: 78000 },
  { name: 'Day 10', value: 92000 },
  { name: 'Day 15', value: 68000 },
  { name: 'Day 20', value: 105000 },
  { name: 'Day 25', value: 88000 },
  { name: 'Day 30', value: 115000 },
];