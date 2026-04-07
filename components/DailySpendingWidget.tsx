import React, { useState } from 'react';
import { Coffee, Car, ShoppingBag, Music, Film, ShoppingCart, Plane, Laptop, Shirt, PlusCircle, Zap, X } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useCurrency } from '../context/CurrencyContext';

const getIcon = (iconName: string, size = 16) => {
  switch (iconName) {
    case 'coffee':       return <Coffee size={size} />;
    case 'car':          return <Car size={size} />;
    case 'shopping-bag': return <ShoppingBag size={size} />;
    case 'music':        return <Music size={size} />;
    case 'tv':           return <Film size={size} />;
    case 'shopping-cart':return <ShoppingCart size={size} />;
    case 'plane':        return <Plane size={size} />;
    case 'laptop':       return <Laptop size={size} />;
    case 'shirt':        return <Shirt size={size} />;
    default:             return <ShoppingBag size={size} />;
  }
};

interface QuickExpenseModalProps {
  onClose: () => void;
  onAdd: (tx: { merchant: string; amount: number; category: string; icon: string; date: string }) => void;
}

const CATEGORIES = [
  { name: 'Dining',        icon: 'coffee'        },
  { name: 'Transport',     icon: 'car'           },
  { name: 'Shopping',      icon: 'shopping-bag'  },
  { name: 'Entertainment', icon: 'music'         },
  { name: 'Groceries',     icon: 'shopping-cart' },
];

const QuickExpenseModal: React.FC<QuickExpenseModalProps> = ({ onClose, onAdd }) => {
  const [merchant,    setMerchant]    = useState('');
  const [amount,      setAmount]      = useState('');
  const [category,    setCategory]    = useState('Dining');

  const selCategory = CATEGORIES.find(c => c.name === category) ?? CATEGORIES[0];

  const handleSubmit = () => {
    if (!merchant.trim() || !amount || isNaN(Number(amount))) return;
    onAdd({
      merchant: merchant.trim(),
      amount: -Math.abs(Number(amount)),
      category,
      icon: selCategory.icon,
      date: 'Today',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm glass-panel-blue border border-white/30 rounded-2xl p-6 animate-slide-up shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white">Quick Expense</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={18} className="text-gray-300" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Merchant / Description</label>
            <input
              type="text"
              value={merchant}
              onChange={e => setMerchant(e.target.value)}
              placeholder="e.g. Zomato, Ola…"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 text-lg font-bold"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-2 block">Category</label>
            <div className="grid grid-cols-5 gap-2">
              {CATEGORIES.map(c => (
                <button
                  key={c.name}
                  onClick={() => setCategory(c.name)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all text-xs ${
                    category === c.name
                      ? 'bg-cyan-500/30 border-cyan-400/60 text-cyan-300'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  {getIcon(c.icon)}
                  <span className="text-[10px] truncate w-full text-center">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!merchant.trim() || !amount}
          className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:scale-105 transition-all disabled:opacity-40 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export const DailySpendingWidget: React.FC = () => {
  const { transactions, addTransaction } = useFinance();
  const { formatCurrency, getCurrencySymbol } = useCurrency();
  const [showModal, setShowModal] = useState(false);

  const DAILY_BUDGET = 3000; // ₹3,000 per day

  // Today's transactions (ones with date "Today")
  const todayTxs = transactions.filter(t => t.date.toLowerCase().startsWith('today'));
  const todaySpent = todayTxs.reduce((s, t) => s + Math.abs(Math.min(t.amount, 0)), 0);
  const pct = Math.min((todaySpent / DAILY_BUDGET) * 100, 100);

  const ringColor = pct >= 100 ? '#ef4444' : pct >= 80 ? '#eab308' : '#22d3ee';

  // SVG radial ring
  const r  = 42;
  const cx = 56;
  const cy = 56;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference - (pct / 100) * circumference;

  const handleAddExpense = (tx: { merchant: string; amount: number; category: string; icon: string; date: string }) => {
    addTransaction(tx);
  };

  return (
    <>
      <div className="neumorphic-card rounded-2xl p-5 flex flex-col gap-4 hover-lift animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap size={16} className="text-cyan-400" />
              Today's Spending
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Daily limit: {formatCurrency(DAILY_BUDGET)}</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs rounded-lg transition-all hover:scale-105"
          >
            <PlusCircle size={14} />
            Add
          </button>
        </div>

        {/* Radial Ring + Amount */}
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <svg width="112" height="112" viewBox="0 0 112 112">
              {/* Track */}
              <circle
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="10"
              />
              {/* Progress */}
              <circle
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={ringColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                transform={`rotate(-90 ${cx} ${cy})`}
                style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.4s ease', filter: `drop-shadow(0 0 8px ${ringColor})` }}
              />
              <text x={cx} y={cy - 6} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">
                {Math.round(pct)}%
              </text>
              <text x={cx} y={cy + 12} textAnchor="middle" fill="#9ca3af" fontSize="10">
                used
              </text>
            </svg>
          </div>

          <div className="flex-1 space-y-2">
            <div>
              <p className="text-xs text-gray-400">Spent Today</p>
              <p className="text-2xl font-extrabold" style={{ color: ringColor }}>
                {getCurrencySymbol()}{todaySpent.toLocaleString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Remaining</p>
              <p className="text-sm font-semibold text-white">
                {formatCurrency(Math.max(DAILY_BUDGET - todaySpent, 0))}
              </p>
            </div>
          </div>
        </div>

        {/* Today's recent transactions */}
        <div className="space-y-2">
          {todayTxs.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-2">No expenses logged today</p>
          ) : (
            todayTxs.slice(0, 3).map(t => (
              <div key={t.id} className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">{getIcon(t.icon)}</span>
                  <span className="text-xs text-white font-medium truncate max-w-[100px]">{t.merchant}</span>
                </div>
                <span className="text-xs font-bold text-red-400">{formatCurrency(Math.abs(t.amount))}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <QuickExpenseModal onClose={() => setShowModal(false)} onAdd={handleAddExpense} />
      )}
    </>
  );
};
