import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useCurrency } from '../context/CurrencyContext';

export const BudgetComparison: React.FC = () => {
  const { budgets } = useFinance();
  const { formatCurrency } = useCurrency();

  const chartData = budgets.map(b => ({
    category: b.category,
    Budget: b.limit,
    Spent: b.spent,
    Remaining: Math.max(0, b.limit - b.spent)
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel-blue border border-white/30 p-3 rounded-lg">
          <p className="text-white font-bold mb-2">{payload[0].payload.category}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(Number(entry.value), 2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel p-6 rounded-2xl hover-lift">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp size={24} className="text-cyan-400" />
            Budget vs Actual
          </h3>
          <p className="text-sm text-gray-300 mt-1">Compare your spending against budgets</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30">
          <AlertCircle size={14} className="text-cyan-400" />
          <span className="text-xs text-cyan-300 font-medium">
            {budgets.filter(b => b.spent > b.limit * 0.8).length} alerts
          </span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="category" 
              stroke="rgba(255,255,255,0.5)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => formatCurrency(Number(value))}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: '#fff' }}
              iconType="circle"
            />
            <Bar dataKey="Budget" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Spent" fill="#22d3ee" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Remaining" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
        <div className="text-center">
          <p className="text-sm text-gray-300 mb-1">Total Budget</p>
          <p className="text-xl font-bold text-white">
            {formatCurrency(budgets.reduce((sum, b) => sum + b.limit, 0), 2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-300 mb-1">Total Spent</p>
          <p className="text-xl font-bold text-cyan-400">
            {formatCurrency(budgets.reduce((sum, b) => sum + b.spent, 0), 2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-300 mb-1">Remaining</p>
          <p className="text-xl font-bold text-green-400">
            {formatCurrency(budgets.reduce((sum, b) => sum + Math.max(0, b.limit - b.spent), 0), 2)}
          </p>
        </div>
      </div>
    </div>
  );
};
