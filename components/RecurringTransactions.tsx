import React, { useState } from 'react';
import { Repeat, Plus, X, Edit2, Trash2, Calendar, DollarSign } from 'lucide-react';

interface RecurringTransaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  nextDate: string;
  active: boolean;
}

export const RecurringTransactions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recurring, setRecurring] = useState<RecurringTransaction[]>([
    {
      id: '1',
      name: 'Netflix Subscription',
      amount: 15.99,
      category: 'Entertainment',
      frequency: 'monthly',
      nextDate: 'Nov 15, 2024',
      active: true
    },
    {
      id: '2',
      name: 'Gym Membership',
      amount: 49.99,
      category: 'Health',
      frequency: 'monthly',
      nextDate: 'Nov 1, 2024',
      active: true
    },
    {
      id: '3',
      name: 'Spotify Premium',
      amount: 9.99,
      category: 'Entertainment',
      frequency: 'monthly',
      nextDate: 'Nov 22, 2024',
      active: false
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: 'Entertainment',
    frequency: 'monthly' as const
  });

  const toggleActive = (id: string) => {
    setRecurring(prev => prev.map(r => 
      r.id === id ? { ...r, active: !r.active } : r
    ));
  };

  const deleteRecurring = (id: string) => {
    setRecurring(prev => prev.filter(r => r.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecurring: RecurringTransaction = {
      id: Date.now().toString(),
      name: formData.name,
      amount: parseFloat(formData.amount),
      category: formData.category,
      frequency: formData.frequency,
      nextDate: 'Next month',
      active: true
    };
    setRecurring(prev => [...prev, newRecurring]);
    setFormData({ name: '', amount: '', category: 'Entertainment', frequency: 'monthly' });
    setIsModalOpen(false);
  };

  const totalMonthly = recurring
    .filter(r => r.active)
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Repeat size={28} className="text-cyan-400" />
            Recurring Transactions
          </h2>
          <p className="text-gray-300 text-sm mt-1">Manage your subscriptions and recurring bills</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all hover:scale-105"
        >
          <Plus size={18} />
          Add Recurring
        </button>
      </div>

      {/* Summary Card */}
      <div className="glass-panel p-6 rounded-2xl hover-lift">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-300 mb-1">Total Monthly Recurring</p>
            <p className="text-4xl font-bold text-white">${totalMonthly.toFixed(2)}</p>
          </div>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/30 flex items-center justify-center">
            <Calendar size={32} className="text-cyan-400" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Active subscriptions</span>
            <span className="text-white font-medium">{recurring.filter(r => r.active).length}</span>
          </div>
        </div>
      </div>

      {/* Recurring List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recurring.map((item, index) => (
          <div
            key={item.id}
            className={`glass-panel p-5 rounded-2xl hover-lift cursor-pointer animate-scale-in ${
              !item.active ? 'opacity-60' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-gray-300">{item.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleActive(item.id)}
                  className={`w-10 h-5 rounded-full relative transition-all ${
                    item.active ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${
                      item.active ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-cyan-400" />
                <span className="text-2xl font-bold text-white">${item.amount}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-medium border border-cyan-500/30">
                {item.frequency}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Calendar size={14} />
                <span>Next: {item.nextDate}</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-cyan-400">
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => deleteRecurring(item.id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="glass-panel-blue border-2 border-white/30 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Add Recurring Transaction</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Netflix"
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Amount</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                >
                  <option value="Entertainment">Entertainment</option>
                  <option value="Health">Health</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all hover:scale-105 mt-2"
              >
                Add Recurring Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
