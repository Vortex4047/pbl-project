import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle, TrendingUp, X } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useCurrency } from '../context/CurrencyContext';

type AlertSeverity = 'critical' | 'warning' | 'info' | 'success';

interface SpendingAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  category?: string;
  value?: number;
}

export const SpendingAlerts: React.FC = () => {
  const { budgets, transactions } = useFinance();
  const { formatCurrency } = useCurrency();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  // Generate alerts from real data
  const generateAlerts = (): SpendingAlert[] => {
    const alerts: SpendingAlert[] = [];

    // Budget alerts
    for (const budget of budgets) {
      const pct = (budget.spent / budget.limit) * 100;

      if (pct >= 100) {
        alerts.push({
          id: `budget-critical-${budget.id}`,
          severity: 'critical',
          title: `Budget Exceeded: ${budget.category}`,
          description: `You've exceeded your ${budget.category} budget by ${formatCurrency(budget.spent - budget.limit)}. Limit: ${formatCurrency(budget.limit)}, Spent: ${formatCurrency(budget.spent)}.`,
          category: budget.category,
          value: pct,
        });
      } else if (pct >= 80) {
        alerts.push({
          id: `budget-warning-${budget.id}`,
          severity: 'warning',
          title: `Budget Warning: ${budget.category}`,
          description: `You've used ${Math.round(pct)}% of your ${budget.category} budget. Only ${formatCurrency(budget.limit - budget.spent)} remaining.`,
          category: budget.category,
          value: pct,
        });
      }
    }

    // Unusual spending detection: if any transaction is > 2× average for that category
    const categoryAmounts: Record<string, number[]> = {};
    for (const t of transactions) {
      if (!categoryAmounts[t.category]) categoryAmounts[t.category] = [];
      categoryAmounts[t.category].push(Math.abs(t.amount));
    }

    for (const [category, amounts] of Object.entries(categoryAmounts)) {
      if (amounts.length < 2) continue;
      const avg = amounts.slice(0, -1).reduce((a, b) => a + b, 0) / (amounts.length - 1);
      const latest = amounts[0];
      if (latest > avg * 2) {
        alerts.push({
          id: `unusual-${category}`,
          severity: 'warning',
          title: `Unusual Spending: ${category}`,
          description: `Your latest ${category} transaction (${formatCurrency(latest)}) is ${(latest / avg).toFixed(1)}× your average of ${formatCurrency(avg)}.`,
          category,
          value: latest,
        });
      }
    }

    // Positive alerts for categories well under budget
    const healthyBudgets = budgets.filter(b => (b.spent / b.limit) * 100 < 50 && b.spent > 0);
    if (healthyBudgets.length > 0) {
      alerts.push({
        id: 'healthy-budgets',
        severity: 'success',
        title: `${healthyBudgets.length} Budget${healthyBudgets.length > 1 ? 's' : ''} On Track`,
        description: `${healthyBudgets.map(b => b.category).join(', ')} ${healthyBudgets.length > 1 ? 'are' : 'is'} well within budget. Great discipline!`,
      });
    }

    // Info: savings rate
    const totalSpent = transactions.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
    const totalIncome = 85000; // assumed
    if (totalSpent / totalIncome > 0.7) {
      alerts.push({
        id: 'savings-rate-warning',
        severity: 'info',
        title: 'Low Savings Rate Detected',
        description: `You're spending approximately ${Math.round((totalSpent / totalIncome) * 100)}% of estimated income. Aim for a 30%+ savings rate.`,
      });
    }

    return alerts;
  };

  const allAlerts = generateAlerts().filter(a => !dismissed.has(a.id));

  const severityConfig: Record<AlertSeverity, { icon: React.ElementType; colorClass: string; bgClass: string; borderClass: string; badgeClass: string }> = {
    critical: {
      icon: AlertCircle,
      colorClass: 'text-red-400',
      bgClass: 'bg-red-500/10',
      borderClass: 'border-red-500/40',
      badgeClass: 'bg-red-500/20 text-red-300',
    },
    warning: {
      icon: AlertTriangle,
      colorClass: 'text-yellow-400',
      bgClass: 'bg-yellow-500/10',
      borderClass: 'border-yellow-500/40',
      badgeClass: 'bg-yellow-500/20 text-yellow-300',
    },
    info: {
      icon: Info,
      colorClass: 'text-blue-400',
      bgClass: 'bg-blue-500/10',
      borderClass: 'border-blue-500/40',
      badgeClass: 'bg-blue-500/20 text-blue-300',
    },
    success: {
      icon: CheckCircle,
      colorClass: 'text-green-400',
      bgClass: 'bg-green-500/10',
      borderClass: 'border-green-500/40',
      badgeClass: 'bg-green-500/20 text-green-300',
    },
  };

  const severityOrder: AlertSeverity[] = ['critical', 'warning', 'info', 'success'];
  const sorted = [...allAlerts].sort(
    (a, b) => severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity)
  );

  if (sorted.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={22} className="text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Smart Alerts</h3>
        </div>
        <div className="flex flex-col items-center justify-center py-10 gap-3 text-gray-400">
          <CheckCircle size={40} className="text-green-400" />
          <p className="text-white font-medium">All clear! No alerts right now.</p>
          <p className="text-sm text-center">Your budgets and spending patterns look healthy.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <TrendingUp size={22} className="text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Smart Alerts</h3>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300 border border-white/20">
          {sorted.length} alert{sorted.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3">
        {sorted.map(alert => {
          const cfg = severityConfig[alert.severity];
          const Icon = cfg.icon;
          return (
            <div
              key={alert.id}
              className={`flex items-start gap-4 p-4 rounded-xl border ${cfg.bgClass} ${cfg.borderClass} animate-fade-in hover:scale-[1.01] transition-transform`}
            >
              <div className={`mt-0.5 shrink-0 ${cfg.colorClass}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="text-sm font-bold text-white">{alert.title}</p>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${cfg.badgeClass}`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{alert.description}</p>
              </div>
              <button
                onClick={() => setDismissed(prev => new Set([...prev, alert.id]))}
                className="shrink-0 p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
