import React from 'react';
import { BudgetComparison } from './BudgetComparison';
import { SpendingTrends } from './SpendingTrends';
import { BarChart3 } from 'lucide-react';

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-in-left">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart3 size={28} className="text-cyan-400" />
          Analytics & Reports
        </h2>
        <p className="text-gray-300 text-sm mt-1">Detailed insights into your financial patterns</p>
      </div>

      <SpendingTrends />
      <BudgetComparison />
    </div>
  );
};
