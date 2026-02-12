import React, { useState } from 'react';
import { TrendingUp, Plus, X, DollarSign, Percent, PieChart } from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useCurrency } from '../context/CurrencyContext';

interface Investment {
  id: string;
  name: string;
  type: 'stocks' | 'crypto' | 'bonds' | 'etf' | 'real-estate';
  amount: number;
  currentValue: number;
  purchasePrice: number;
  quantity: number;
}

export const InvestmentPortfolio: React.FC = () => {
  const { formatCurrency } = useCurrency();
  type InvestmentForm = {
    name: string;
    type: Investment['type'];
    amount: string;
    currentValue: string;
    purchasePrice: string;
    quantity: string;
  };

  const [investments, setInvestments] = useState<Investment[]>([
    { id: '1', name: 'Apple (AAPL)', type: 'stocks', amount: 5000, currentValue: 5850, purchasePrice: 150, quantity: 33 },
    { id: '2', name: 'Bitcoin', type: 'crypto', amount: 3000, currentValue: 3450, purchasePrice: 30000, quantity: 0.1 },
    { id: '3', name: 'S&P 500 ETF', type: 'etf', amount: 10000, currentValue: 11200, purchasePrice: 400, quantity: 25 },
    { id: '4', name: 'Treasury Bonds', type: 'bonds', amount: 5000, currentValue: 5100, purchasePrice: 1000, quantity: 5 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<InvestmentForm>({
    name: '',
    type: 'stocks',
    amount: '',
    currentValue: '',
    purchasePrice: '',
    quantity: ''
  });

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalGain = totalValue - totalInvested;
  const totalGainPercent = totalInvested > 0 ? ((totalGain / totalInvested) * 100).toFixed(2) : '0.00';

  const pieData = investments.map(inv => ({
    name: inv.name,
    value: inv.currentValue
  }));

  const COLORS = ['#22d3ee', '#a855f7', '#10b981', '#f59e0b', '#ef4444'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvestment: Investment = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      amount: parseFloat(formData.amount),
      currentValue: parseFloat(formData.currentValue),
      purchasePrice: parseFloat(formData.purchasePrice),
      quantity: parseFloat(formData.quantity)
    };
    setInvestments([...investments, newInvestment]);
    setFormData({ name: '', type: 'stocks', amount: '', currentValue: '', purchasePrice: '', quantity: '' });
    setIsModalOpen(false);
  };

  const deleteInvestment = (id: string) => {
    setInvestments(investments.filter(inv => inv.id !== id));
  };

  return (
    <div className="space-y-6 animate-slide-in-left">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp size={28} className="text-green-400" />
            Investment Portfolio
          </h2>
          <p className="text-gray-300 text-sm mt-1">Track your investments and returns</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all hover:scale-105"
        >
          <Plus size={18} />
          Add Investment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <p className="text-sm text-gray-300 mb-1">Total Invested</p>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalInvested)}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <p className="text-sm text-gray-300 mb-1">Current Value</p>
          <p className="text-3xl font-bold text-cyan-400">{formatCurrency(totalValue)}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <p className="text-sm text-gray-300 mb-1">Total Gain/Loss</p>
          <p className={`text-3xl font-bold ${totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {totalGain >= 0 ? '+' : ''}{formatCurrency(totalGain)}
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <p className="text-sm text-gray-300 mb-1">Return %</p>
          <p className={`text-3xl font-bold ${parseFloat(totalGainPercent) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {parseFloat(totalGainPercent) >= 0 ? '+' : ''}{totalGainPercent}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Distribution */}
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <PieChart size={20} className="text-cyan-400" />
            Portfolio Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Investment List */}
        <div className="space-y-4">
          {investments.map((inv, index) => {
            const gain = inv.currentValue - inv.amount;
            const gainPercent = ((gain / inv.amount) * 100).toFixed(2);
            return (
              <div
                key={inv.id}
                className="glass-panel p-5 rounded-2xl hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{inv.name}</h3>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-medium border border-cyan-500/30">
                      {inv.type.toUpperCase()}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteInvestment(inv.id)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-red-400"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Invested</p>
                    <p className="text-xl font-bold text-white">{formatCurrency(inv.amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Current Value</p>
                    <p className="text-xl font-bold text-cyan-400">{formatCurrency(inv.currentValue)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className={gain >= 0 ? 'text-green-400' : 'text-red-400'} />
                    <span className={`text-sm font-medium ${gain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {gain >= 0 ? '+' : ''}{formatCurrency(gain, 2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Percent size={14} className={parseFloat(gainPercent) >= 0 ? 'text-green-400' : 'text-red-400'} />
                    <span className={`text-sm font-medium ${parseFloat(gainPercent) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {parseFloat(gainPercent) >= 0 ? '+' : ''}{gainPercent}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Investment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="glass-panel-blue border-2 border-white/30 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Add Investment</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Investment Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Apple (AAPL)"
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all placeholder:text-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Investment['type'] })}
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                >
                  <option value="stocks">Stocks</option>
                  <option value="crypto">Cryptocurrency</option>
                  <option value="etf">ETF</option>
                  <option value="bonds">Bonds</option>
                  <option value="real-estate">Real Estate</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Amount Invested</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="5000"
                    step="0.01"
                    min="0"
                    className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all placeholder:text-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Current Value</label>
                  <input
                    type="number"
                    value={formData.currentValue}
                    onChange={(e) => setFormData({ ...formData, currentValue: e.target.value })}
                    placeholder="5850"
                    step="0.01"
                    min="0"
                    className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Purchase Price</label>
                  <input
                    type="number"
                    value={formData.purchasePrice}
                    onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                    placeholder="150"
                    step="0.01"
                    min="0"
                    className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all placeholder:text-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="33"
                    step="0.01"
                    min="0"
                    className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all hover:scale-105 mt-2"
              >
                Add Investment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
