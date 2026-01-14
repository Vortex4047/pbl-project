import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, TrendingUp, Calendar, Coffee, Car, ShoppingBag, Music, Film, ShoppingCart, Plane, Laptop, Shirt, PlusCircle, Lightbulb } from 'lucide-react';
import { RadialScore } from './RadialScore';
import { CHART_DATA, TRANSACTIONS, BUDGETS, SAVINGS_GOALS } from '../constants';
import { Budget, SavingsGoal, Transaction } from '../types';

interface DashboardProps {
  onAskAI: (query: string) => void;
  onNavigate: (view: 'wallet' | 'planning') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onAskAI, onNavigate }) => {

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'coffee': return <Coffee size={18} />;
      case 'car': return <Car size={18} />;
      case 'shopping-bag': return <ShoppingBag size={18} />;
      case 'music': return <Music size={18} />;
      case 'tv': return <Film size={18} />;
      case 'shopping-cart': return <ShoppingCart size={18} />;
      case 'plane': return <Plane size={18} />;
      case 'laptop': return <Laptop size={18} />;
      case 'shirt': return <Shirt size={18} />;
      default: return <ShoppingBag size={18} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Grid: Hero & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Financial Pulse */}
        <div className="lg:col-span-3 neumorphic-card rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <RadialScore score={785} />
          <h2 className="text-lg font-semibold text-white">Financial Pulse</h2>
          <p className="text-sm text-gray-400 text-center mt-2">Excellent standing. You are in the top 5% of savers.</p>
        </div>

        {/* Spending Forecast */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 flex flex-col min-h-[300px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Spending Forecast
                <span className="px-2 py-1 rounded text-[10px] bg-primary/20 text-primary font-bold border border-primary/20">AI PREDICTED</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1">Projected end-of-month balance: <span className="text-white font-medium">$4,250</span></p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 text-white hover:bg-white/10 border border-white/5 transition-colors">7D</button>
              <button className="px-3 py-1 rounded-lg text-xs font-medium bg-primary text-black font-bold shadow-[0_0_15px_rgba(0,184,194,0.4)]">30D</button>
              <button className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 text-white hover:bg-white/10 border border-white/5 transition-colors">3M</button>
            </div>
          </div>
          
          <div className="flex-grow w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00b8c2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00b8c2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#333', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#00b8c2' }}
                  cursor={{ stroke: '#333', strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00b8c2" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="flex-1 glass-panel rounded-2xl p-6 relative overflow-hidden border-l-4 border-l-secondary/60">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-secondary/20 rounded-full blur-2xl"></div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-secondary to-purple-600 p-1.5 rounded-lg shadow-lg">
                <Lightbulb size={14} className="text-white" />
              </div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">AI Insight</span>
            </div>
            <h3 className="text-lg font-bold text-white leading-snug mb-2">Anomaly Detected</h3>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Dining expenses are <span className="text-red-400 font-bold">20% higher</span> than your monthly baseline.
            </p>
            <button 
              onClick={() => onAskAI("Analyze my dining spend anomaly")}
              className="w-full group flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium text-white"
            >
              <span>Analyze Spend</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="h-24 neumorphic-card rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Recurring Bills</p>
              <p className="text-xl font-bold text-white">$1,204</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
              <Calendar size={20} className="text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Recent Transactions */}
        <div className="glass-panel rounded-2xl flex flex-col h-full max-h-[400px]">
          <div className="p-6 pb-2 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
            <button onClick={() => onNavigate('wallet')} className="text-xs text-primary hover:text-white transition-colors">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {TRANSACTIONS.slice(0, 4).map((t) => (
              <div key={t.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1b2728] border border-white/5 flex items-center justify-center text-white group-hover:border-primary/50 transition-colors">
                    {getIcon(t.icon)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{t.merchant}</p>
                    <p className="text-xs text-gray-500">{t.date}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-white">${Math.abs(t.amount).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Budgets */}
        <div className="neumorphic-card rounded-2xl p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Active Budgets</h3>
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {BUDGETS.slice(0, 3).map((b) => {
               const pct = Math.min((b.spent / b.limit) * 100, 100);
               return (
                <div key={b.id}>
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-2">
                      {b.category === 'Dining' && <Coffee size={14} className="text-gray-400" />}
                      {b.category === 'Transport' && <Car size={14} className="text-gray-400" />}
                      {b.category === 'Groceries' && <ShoppingCart size={14} className="text-gray-400" />}
                      <span className="text-sm font-medium text-white">{b.category}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: b.color }}>{Math.round(pct)}%</span>
                  </div>
                  <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${pct}%`, backgroundColor: b.color, boxShadow: `0 0 10px ${b.color}80` }}
                    ></div>
                  </div>
                  <p className="text-right text-[10px] text-gray-500 mt-1">${b.spent} / ${b.limit}</p>
                </div>
               );
            })}
          </div>
          <button 
            onClick={() => onNavigate('planning')}
            className="mt-auto w-full py-3 border border-dashed border-gray-700 text-gray-400 rounded-xl text-xs font-medium hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle size={14} />
            Add Budget Category
          </button>
        </div>

        {/* Savings Goals */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col h-full">
          <h3 className="text-lg font-bold text-white mb-4">Savings Goals</h3>
          <div className="grid grid-cols-2 gap-3">
            {SAVINGS_GOALS.map((g) => {
              const pct = (g.current / g.target) * 100;
              const barColor = g.color === 'blue' ? 'bg-blue-500' : g.color === 'purple' ? 'bg-purple-500' : 'bg-pink-500';
              const textColor = g.color === 'blue' ? 'text-blue-400' : g.color === 'purple' ? 'text-purple-400' : 'text-pink-400';
              const bgColor = g.color === 'blue' ? 'bg-blue-500/20' : g.color === 'purple' ? 'bg-purple-500/20' : 'bg-pink-500/20';
              
              return (
                <div key={g.id} className="bg-gradient-to-br from-white/5 to-white/0 border border-white/5 rounded-2xl p-4 hover:border-primary/40 transition-colors group cursor-pointer relative overflow-hidden">
                  <div className={`absolute bottom-0 left-0 h-1 ${barColor} transition-all group-hover:h-[2px]`} style={{ width: `${pct}%` }}></div>
                  <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center ${textColor} mb-3`}>
                    {getIcon(g.icon)}
                  </div>
                  <p className="text-sm font-bold text-white mb-1">{g.name}</p>
                  <p className="text-xs text-gray-400">${g.current} / ${g.target / 1000}k</p>
                </div>
              )
            })}
            
            <div className="border border-dashed border-gray-700 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors cursor-pointer text-gray-500 hover:text-white">
              <PlusCircle size={20} />
              <span className="text-xs font-medium">Create Goal</span>
            </div>
          </div>
          
          <div className="mt-auto pt-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#18181b] to-transparent border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb size={12} className="text-primary" />
                <span className="text-xs font-bold text-primary">Tip</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-tight">Saving $50 more weekly hits your 'Japan Trip' goal 2 months early.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};