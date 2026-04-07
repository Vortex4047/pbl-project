import React from 'react';
import { BudgetComparison } from './BudgetComparison';
import { SpendingTrends } from './SpendingTrends';
import { SpendingAlerts } from './SpendingAlerts';
import { BarChart3, Download } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useCurrency } from '../context/CurrencyContext';
import { generateReport } from '../utils/generateReport';

export const Analytics: React.FC = () => {
  const { transactions, budgets, savingsGoals } = useFinance();
  const { formatCurrency } = useCurrency();

  const handleExport = () => {
    generateReport(transactions, budgets, savingsGoals, formatCurrency);
  };

  return (
    <div className="space-y-6 animate-slide-in-left">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 size={28} className="text-cyan-400" />
            Analytics &amp; Reports
          </h2>
          <p className="text-gray-300 text-sm mt-1">Detailed insights into your financial patterns</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border border-cyan-400/40 text-cyan-300 rounded-xl text-sm font-medium transition-all hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
        >
          <Download size={16} />
          Export Report
        </button>
      </div>

      <SpendingAlerts />
      <SpendingTrends />
      <BudgetComparison />
    </div>
  );
};
