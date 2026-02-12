import React, { useState } from 'react';
import { CreditCard, Plus, X, TrendingDown, AlertCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface Debt {
  id: string;
  name: string;
  totalAmount: number;
  remainingAmount: number;
  interestRate: number;
  minimumPayment: number;
  dueDate: string;
  type: 'credit-card' | 'loan' | 'mortgage' | 'other';
}

export const DebtTracker: React.FC = () => {
  const { formatCurrency } = useCurrency();
  type DebtForm = {
    name: string;
    totalAmount: string;
    remainingAmount: string;
    interestRate: string;
    minimumPayment: string;
    type: Debt['type'];
  };

  const [debts, setDebts] = useState<Debt[]>([
    {
      id: '1',
      name: 'Credit Card - Chase',
      totalAmount: 5000,
      remainingAmount: 3200,
      interestRate: 18.99,
      minimumPayment: 150,
      dueDate: 'Nov 15',
      type: 'credit-card'
    },
    {
      id: '2',
      name: 'Student Loan',
      totalAmount: 25000,
      remainingAmount: 18500,
      interestRate: 4.5,
      minimumPayment: 300,
      dueDate: 'Nov 1',
      type: 'loan'
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<DebtForm>({
    name: '',
    totalAmount: '',
    remainingAmount: '',
    interestRate: '',
    minimumPayment: '',
    type: 'credit-card'
  });

  const totalDebt = debts.reduce((sum, d) => sum + d.remainingAmount, 0);
  const totalMinPayment = debts.reduce((sum, d) => sum + d.minimumPayment, 0);
  const avgInterest = debts.length > 0 ? debts.reduce((sum, d) => sum + d.interestRate, 0) / debts.length : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDebt: Debt = {
      id: Date.now().toString(),
      name: formData.name,
      totalAmount: parseFloat(formData.totalAmount),
      remainingAmount: parseFloat(formData.remainingAmount),
      interestRate: parseFloat(formData.interestRate),
      minimumPayment: parseFloat(formData.minimumPayment),
      dueDate: 'Next month',
      type: formData.type
    };
    setDebts([...debts, newDebt]);
    setFormData({ name: '', totalAmount: '', remainingAmount: '', interestRate: '', minimumPayment: '', type: 'credit-card' });
    setIsModalOpen(false);
  };

  const deleteDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-6 animate-slide-in-left">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <CreditCard size={28} className="text-red-400" />
            Debt Tracker
          </h2>
          <p className="text-gray-300 text-sm mt-1">Monitor and manage your debts</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all hover:scale-105"
        >
          <Plus size={18} />
          Add Debt
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-300">Total Debt</p>
            <AlertCircle size={18} className="text-red-400" />
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalDebt)}</p>
          <p className="text-xs text-gray-400 mt-2">{debts.length} active debts</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-300">Min. Monthly Payment</p>
            <TrendingDown size={18} className="text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalMinPayment)}</p>
          <p className="text-xs text-gray-400 mt-2">Due this month</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-300">Avg. Interest Rate</p>
            <CreditCard size={18} className="text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-white">{avgInterest.toFixed(2)}%</p>
          <p className="text-xs text-gray-400 mt-2">Across all debts</p>
        </div>
      </div>

      {/* Debt List */}
      <div className="space-y-4">
        {debts.map((debt, index) => {
          const progress = ((debt.totalAmount - debt.remainingAmount) / debt.totalAmount) * 100;
          return (
            <div
              key={debt.id}
              className="glass-panel p-6 rounded-2xl hover-lift animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{debt.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <span>Interest: {debt.interestRate}%</span>
                    <span>•</span>
                    <span>Due: {debt.dueDate}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteDebt(debt.id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-red-400"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Remaining</p>
                  <p className="text-2xl font-bold text-red-400">{formatCurrency(debt.remainingAmount)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Min. Payment</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(debt.minimumPayment)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Progress</span>
                  <span className="text-cyan-400 font-medium">{progress.toFixed(1)}% paid off</span>
                </div>
                <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Debt Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="glass-panel-blue border-2 border-white/30 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Add Debt</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Debt Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Credit Card - Chase"
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all placeholder:text-gray-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Total Amount</label>
                  <input
                    type="number"
                    value={formData.totalAmount}
                    onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                    placeholder="5000"
                    step="0.01"
                    min="0"
                    className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all placeholder:text-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Remaining</label>
                  <input
                    type="number"
                    value={formData.remainingAmount}
                    onChange={(e) => setFormData({ ...formData, remainingAmount: e.target.value })}
                    placeholder="3200"
                    step="0.01"
                    min="0"
                    className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Interest Rate (%)</label>
                  <input
                    type="number"
                    value={formData.interestRate}
                    onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                    placeholder="18.99"
                    step="0.01"
                    min="0"
                    className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all placeholder:text-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Min. Payment</label>
                  <input
                    type="number"
                    value={formData.minimumPayment}
                    onChange={(e) => setFormData({ ...formData, minimumPayment: e.target.value })}
                    placeholder="150"
                    step="0.01"
                    min="0"
                    className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Debt['type'] })}
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                >
                  <option value="credit-card">Credit Card</option>
                  <option value="loan">Loan</option>
                  <option value="mortgage">Mortgage</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all hover:scale-105 mt-2"
              >
                Add Debt
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
