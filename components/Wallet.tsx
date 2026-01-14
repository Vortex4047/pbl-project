import React, { useState } from 'react';
import { Search, Filter, Download, ArrowDownUp, Coffee, Car, ShoppingBag, Music, Film, ShoppingCart } from 'lucide-react';
import { TRANSACTIONS } from '../constants';

export const Wallet: React.FC = () => {
  const [filter, setFilter] = useState('');

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

  const filtered = TRANSACTIONS.filter(t => 
    t.merchant.toLowerCase().includes(filter.toLowerCase()) || 
    t.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Wallet & Transactions</h2>
          <p className="text-gray-400 text-sm">Manage your expenses and income.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-[#18181b] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white hover:border-white/20 transition-colors">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white hover:border-white/20 transition-colors">
            <ArrowDownUp size={16} />
            Sort
          </button>
        </div>
      </div>

      {/* List */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-gray-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Transaction</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-right">Amount</th>
                <th className="p-4 font-medium text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((t) => (
                <tr key={t.id} className="group hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1b2728] border border-white/5 flex items-center justify-center text-white group-hover:border-primary/50 transition-colors">
                        {getIcon(t.icon)}
                      </div>
                      <span className="font-medium text-white">{t.merchant}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/5">
                      {t.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{t.date}</td>
                  <td className="p-4 text-right font-medium text-white">
                    ${Math.abs(t.amount).toFixed(2)}
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-gray-500 hover:text-primary transition-colors">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No transactions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};