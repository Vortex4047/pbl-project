import React, { useState } from 'react';
import { Bell, Calendar, Plus, X, Check, AlertCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  status: 'upcoming' | 'due-soon' | 'overdue' | 'paid';
  recurring: boolean;
}

export const BillReminders: React.FC = () => {
  const { formatCurrency } = useCurrency();
  const [bills, setBills] = useState<Bill[]>([
    { id: '1', name: 'Rent', amount: 1500, dueDate: 'Nov 1', category: 'Housing', status: 'upcoming', recurring: true },
    { id: '2', name: 'Electric Bill', amount: 120, dueDate: 'Nov 5', category: 'Utilities', status: 'due-soon', recurring: true },
    { id: '3', name: 'Internet', amount: 80, dueDate: 'Nov 10', category: 'Utilities', status: 'upcoming', recurring: true },
    { id: '4', name: 'Car Insurance', amount: 150, dueDate: 'Oct 28', category: 'Insurance', status: 'overdue', recurring: true },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    dueDate: '',
    category: 'Utilities',
    recurring: true
  });

  const markAsPaid = (id: string) => {
    setBills(bills.map(bill => 
      bill.id === id ? { ...bill, status: 'paid' as const } : bill
    ));
  };

  const deleteBill = (id: string) => {
    setBills(bills.filter(bill => bill.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBill: Bill = {
      id: Date.now().toString(),
      name: formData.name,
      amount: parseFloat(formData.amount),
      dueDate: formData.dueDate,
      category: formData.category,
      status: 'upcoming',
      recurring: formData.recurring
    };
    setBills([...bills, newBill]);
    setFormData({ name: '', amount: '', dueDate: '', category: 'Utilities', recurring: true });
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'bg-red-500/20 border-red-500/30 text-red-400';
      case 'due-soon': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'paid': return 'bg-green-500/20 border-green-500/30 text-green-400';
      default: return 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400';
    }
  };

  const upcomingBills = bills.filter(b => b.status !== 'paid');
  const totalDue = upcomingBills.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="space-y-6 animate-slide-in-left">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bell size={28} className="text-yellow-400" />
            Bill Reminders
          </h2>
          <p className="text-gray-300 text-sm mt-1">Never miss a payment</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all hover:scale-105"
        >
          <Plus size={18} />
          Add Bill
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={18} className="text-yellow-400" />
            <p className="text-sm text-gray-300">Total Due</p>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalDue)}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={18} className="text-cyan-400" />
            <p className="text-sm text-gray-300">Upcoming Bills</p>
          </div>
          <p className="text-3xl font-bold text-white">{upcomingBills.length}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <div className="flex items-center gap-2 mb-2">
            <Check size={18} className="text-green-400" />
            <p className="text-sm text-gray-300">Paid This Month</p>
          </div>
          <p className="text-3xl font-bold text-white">{bills.filter(b => b.status === 'paid').length}</p>
        </div>
      </div>

      {/* Bills List */}
      <div className="space-y-3">
        {bills.map((bill, index) => (
          <div
            key={bill.id}
            className={`glass-panel p-5 rounded-2xl hover-lift animate-scale-in ${
              bill.status === 'paid' ? 'opacity-60' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-12 h-12 rounded-full ${getStatusColor(bill.status)} border flex items-center justify-center`}>
                  {bill.status === 'paid' ? <Check size={20} /> : <Bell size={20} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-white">{bill.name}</h3>
                    {bill.recurring && (
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-medium border border-cyan-500/30">
                        Recurring
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <span>{bill.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      Due: {bill.dueDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{formatCurrency(bill.amount)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(bill.status)} border`}>
                    {bill.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex gap-2">
                  {bill.status !== 'paid' && (
                    <button
                      onClick={() => markAsPaid(bill.id)}
                      className="p-2 hover:bg-green-500/20 rounded-lg transition-all text-gray-400 hover:text-green-400"
                    >
                      <Check size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteBill(bill.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-all text-gray-400 hover:text-red-400"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Bill Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="glass-panel-blue border-2 border-white/30 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Add Bill Reminder</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Bill Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Electric Bill"
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all placeholder:text-gray-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Amount</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="120"
                    step="0.01"
                    min="0"
                    className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all placeholder:text-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Due Date</label>
                  <input
                    type="text"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    placeholder="Nov 5"
                    className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                >
                  <option value="Utilities">Utilities</option>
                  <option value="Housing">Housing</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Subscriptions">Subscriptions</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={formData.recurring}
                  onChange={(e) => setFormData({ ...formData, recurring: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 checked:bg-yellow-500 focus:ring-2 focus:ring-yellow-400"
                />
                <label htmlFor="recurring" className="text-sm text-white">Recurring bill</label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-3 rounded-lg hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all hover:scale-105 mt-2"
              >
                Add Bill Reminder
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
