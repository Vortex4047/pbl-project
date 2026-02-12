import React, { useState } from 'react';
import { Search, Filter, Download, ArrowDownUp, Coffee, Car, ShoppingBag, Music, Film, ShoppingCart, Plus, X } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useCurrency } from '../context/CurrencyContext';
import { Transaction } from '../types';

export const Wallet: React.FC = () => {
  const { transactions, addTransaction } = useFinance();
  const { formatCurrency } = useCurrency();
  const [filter, setFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // New transaction state
  const [newAmount, setNewAmount] = useState('');
  const [newMerchant, setNewMerchant] = useState('');
  const [newCategory, setNewCategory] = useState('Dining');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'coffee': return <Coffee size={20} />;
      case 'car': return <Car size={20} />;
      case 'shopping-bag': return <ShoppingBag size={20} />;
      case 'music': return <Music size={20} />;
      case 'tv': return <Film size={20} />;
      case 'shopping-cart': return <ShoppingCart size={20} />;
      default: return <ShoppingBag size={20} />;
    }
  };

  // Safe filtering with null checks
  const filtered = (transactions || []).filter(t => {
    if (!t) return false;
    const merchant = (t.merchant || '').toLowerCase();
    const category = (t.category || '').toLowerCase();
    const searchTerm = (filter || '').toLowerCase();
    return merchant.includes(searchTerm) || category.includes(searchTerm);
  });

  const handleExport = () => {
    const headers = ["Date", "Merchant", "Category", "Amount"];
    const csvContent = [
      headers.join(","),
      ...transactions.map(t => `${t.date},${t.merchant},${t.category},${t.amount}`)
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAmount || !newMerchant) return;

    const iconMap: Record<string, string> = {
      'Dining': 'coffee',
      'Groceries': 'shopping-cart',
      'Transport': 'car',
      'Shopping': 'shopping-bag',
      'Entertainment': 'tv'
    };

    addTransaction({
      merchant: newMerchant,
      amount: -parseFloat(newAmount),
      category: newCategory,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      icon: iconMap[newCategory] || 'shopping-bag'
    });

    setNewAmount('');
    setNewMerchant('');
    setNewCategory('Dining');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-slide-in-left relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Wallet & Transactions</h2>
          <p className="text-gray-300 text-sm">Manage your expenses and income.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-sm font-bold hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all hover:scale-105"
          >
            <Plus size={16} />
            New Transaction
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm font-medium hover:bg-white/20 transition-all hover:scale-105"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center hover-lift">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-gray-200 hover:text-white hover:border-cyan-400/50 hover:bg-white/20 transition-all">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-gray-200 hover:text-white hover:border-cyan-400/50 hover:bg-white/20 transition-all">
            <ArrowDownUp size={16} />
            Sort
          </button>
        </div>
      </div>

      {/* List */}
      <div className="glass-panel rounded-2xl overflow-hidden hover-lift">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-300 text-xs uppercase tracking-wider bg-white/5">
                <th className="p-4 font-medium">Transaction</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-right">Amount</th>
                <th className="p-4 font-medium text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((t, index) => (
                <tr 
                  key={t.id} 
                  className="group hover:bg-white/10 transition-all cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-white/20 flex items-center justify-center text-white group-hover:border-cyan-400/50 group-hover:bg-cyan-500/30 transition-all group-hover:scale-110">
                        {getIcon(t.icon)}
                      </div>
                      <span className="font-medium text-white group-hover:text-cyan-300 transition-colors">{t.merchant}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-gray-200 border border-white/20 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 group-hover:text-cyan-300 transition-all">
                      {t.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-300 group-hover:text-white transition-colors">{t.date}</td>
                  <td className="p-4 text-right font-medium text-white group-hover:text-cyan-300 transition-colors">
                    {formatCurrency(Math.abs(t.amount))}
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-gray-400 hover:text-cyan-400 transition-all hover:scale-110">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              No transactions found.
            </div>
          )}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="glass-panel-blue border-2 border-white/30 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Add Transaction</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)} 
                className="text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Merchant</label>
                <input 
                  type="text" 
                  value={newMerchant}
                  onChange={(e) => setNewMerchant(e.target.value)}
                  placeholder="e.g. Starbucks"
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-gray-500"
                  autoFocus
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Amount</label>
                <input 
                  type="number" 
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
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
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                >
                  <option value="Dining">Dining</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Transport">Transport</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all hover:scale-105 mt-2"
              >
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};