import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export const SpendingInsights: React.FC = () => {
  const { transactions, budgets } = useFinance();

  // Calculate insights
  const totalSpent = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const avgTransaction = totalSpent / transactions.length;
  const highestCategory = budgets.reduce((max, b) => b.spent > max.spent ? b : max, budgets[0]);
  const overBudget = budgets.filter(b => (b.spent / b.limit) > 0.8);

  const insights = [
    {
      icon: <TrendingUp size={20} className="text-cyan-400" />,
      title: 'Total Spending',
      value: `$${totalSpent.toFixed(2)}`,
      change: '+12% from last month',
      trend: 'up',
      color: 'cyan'
    },
    {
      icon: <AlertCircle size={20} className="text-yellow-400" />,
      title: 'Highest Category',
      value: highestCategory?.category || 'N/A',
      change: `$${highestCategory?.spent || 0} spent`,
      trend: 'warning',
      color: 'yellow'
    },
    {
      icon: <CheckCircle size={20} className="text-green-400" />,
      title: 'Avg Transaction',
      value: `$${avgTransaction.toFixed(2)}`,
      change: 'Within normal range',
      trend: 'good',
      color: 'green'
    },
    {
      icon: <TrendingDown size={20} className="text-purple-400" />,
      title: 'Budget Alerts',
      value: `${overBudget.length}`,
      change: 'Categories over 80%',
      trend: overBudget.length > 0 ? 'warning' : 'good',
      color: 'purple'
    },
  ];

  const tips = [
    'You spent 23% more on dining this week. Consider meal prepping!',
    'Great job! You\'re under budget in 3 categories.',
    'Your transport costs are trending down. Keep it up!',
  ];

  return (
    <div className="space-y-6">
      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="glass-panel p-4 rounded-2xl hover-lift cursor-pointer animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-${insight.color}-500/20 flex items-center justify-center`}>
                {insight.icon}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                insight.trend === 'up' ? 'bg-cyan-500/20 text-cyan-300' :
                insight.trend === 'warning' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-green-500/20 text-green-300'
              }`}>
                {insight.trend === 'up' ? '↑' : insight.trend === 'warning' ? '⚠' : '✓'}
              </span>
            </div>
            <h3 className="text-sm text-gray-300 mb-1">{insight.title}</h3>
            <p className="text-2xl font-bold text-white mb-1">{insight.value}</p>
            <p className="text-xs text-gray-400">{insight.change}</p>
          </div>
        ))}
      </div>

      {/* AI Tips */}
      <div className="glass-panel p-6 rounded-2xl hover-lift">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={20} className="text-cyan-400" />
          <h3 className="text-lg font-bold text-white">AI Insights</h3>
        </div>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-cyan-500/30 transition-all">
                <span className="text-cyan-400 text-xs font-bold">{index + 1}</span>
              </div>
              <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
