import React from 'react';
import { TrendingUp, Home, Briefcase, CreditCard, Wallet, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCurrency } from '../context/CurrencyContext';

export const NetWorthTracker: React.FC = () => {
  const { formatCurrency } = useCurrency();

  const assets = [
    { name: 'Cash & Savings', amount: 15000, icon: <Wallet size={20} />, color: 'cyan' },
    { name: 'Investments', amount: 23200, icon: <TrendingUp size={20} />, color: 'green' },
    { name: 'Real Estate', amount: 250000, icon: <Home size={20} />, color: 'blue' },
    { name: 'Retirement', amount: 45000, icon: <Briefcase size={20} />, color: 'purple' },
  ];

  const liabilities = [
    { name: 'Credit Cards', amount: 3200, icon: <CreditCard size={20} />, color: 'red' },
    { name: 'Student Loans', amount: 18500, icon: <DollarSign size={20} />, color: 'orange' },
    { name: 'Mortgage', amount: 180000, icon: <Home size={20} />, color: 'pink' },
  ];

  const totalAssets = assets.reduce((sum, a) => sum + a.amount, 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.amount, 0);
  const netWorth = totalAssets - totalLiabilities;

  const historyData = [
    { month: 'Jan', netWorth: 125000 },
    { month: 'Feb', netWorth: 127500 },
    { month: 'Mar', netWorth: 129000 },
    { month: 'Apr', netWorth: 128500 },
    { month: 'May', netWorth: 130000 },
    { month: 'Jun', netWorth: netWorth },
  ];
  const colorClasses: Record<string, string> = {
    cyan: 'bg-cyan-500/20 text-cyan-400',
    green: 'bg-green-500/20 text-green-400',
    blue: 'bg-blue-500/20 text-blue-400',
    purple: 'bg-purple-500/20 text-purple-400',
    red: 'bg-red-500/20 text-red-400',
    orange: 'bg-orange-500/20 text-orange-400',
    pink: 'bg-pink-500/20 text-pink-400',
  };

  return (
    <div className="space-y-6 animate-slide-in-left">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <TrendingUp size={28} className="text-cyan-400" />
          Net Worth Tracker
        </h2>
        <p className="text-gray-300 text-sm mt-1">Monitor your total financial health</p>
      </div>

      {/* Net Worth Summary */}
      <div className="glass-panel p-8 rounded-2xl hover-lift text-center">
        <p className="text-sm text-gray-300 mb-2">Total Net Worth</p>
        <p className="text-6xl font-bold text-white mb-4">{formatCurrency(netWorth)}</p>
        <div className="flex items-center justify-center gap-2 text-green-400">
          <TrendingUp size={20} />
          <span className="text-lg font-medium">+{formatCurrency(5000)} this month</span>
        </div>
      </div>

      {/* Net Worth Chart */}
      <div className="glass-panel p-6 rounded-2xl hover-lift">
        <h3 className="text-lg font-bold text-white mb-4">Net Worth History</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historyData}>
              <defs>
                <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" tickFormatter={(value) => formatCurrency(Number(value))} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e5a8e', borderColor: '#22d3ee', borderRadius: '8px' }}
                itemStyle={{ color: '#22d3ee' }}
                formatter={(value) => formatCurrency(Number(value))}
              />
              <Area 
                type="monotone" 
                dataKey="netWorth" 
                stroke="#22d3ee" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#netWorthGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets */}
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Assets</h3>
            <p className="text-2xl font-bold text-green-400">{formatCurrency(totalAssets)}</p>
          </div>
          <div className="space-y-4">
            {assets.map((asset, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${colorClasses[asset.color] || 'bg-cyan-500/20 text-cyan-400'}`}>
                    {asset.icon}
                  </div>
                  <span className="text-white font-medium">{asset.name}</span>
                </div>
                <span className="text-white font-bold">{formatCurrency(asset.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Liabilities */}
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Liabilities</h3>
            <p className="text-2xl font-bold text-red-400">{formatCurrency(totalLiabilities)}</p>
          </div>
          <div className="space-y-4">
            {liabilities.map((liability, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${colorClasses[liability.color] || 'bg-cyan-500/20 text-cyan-400'}`}>
                    {liability.icon}
                  </div>
                  <span className="text-white font-medium">{liability.name}</span>
                </div>
                <span className="text-white font-bold">{formatCurrency(liability.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
