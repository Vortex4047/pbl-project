import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, Calendar, Coffee, Car, ShoppingBag, Music, Film, ShoppingCart, Plane, Laptop, Shirt, PlusCircle, Lightbulb } from 'lucide-react';
import { RadialScore } from './RadialScore';
import { SpendingInsights } from './SpendingInsights';
import { useFinance } from '../context/FinanceContext';
import { useCurrency } from '../context/CurrencyContext';
import { Link } from 'react-router-dom';

type TimeRange = '7D' | '30D' | '3M';

export const Dashboard: React.FC = () => {
  const { transactions, budgets, savingsGoals } = useFinance();
  const { formatCurrency, getCurrencySymbol } = useCurrency();
  const [timeRange, setTimeRange] = useState<TimeRange>('30D');

  // Generate chart data based on time range with AI prediction
  const generateChartData = (range: TimeRange) => {
    const today = new Date();
    let data = [];
    
    if (range === '7D') {
      // 7 days of historical + 3 days prediction
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        data.push({
          name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: 85000 + Math.random() * 30000 - 15000,
          isPrediction: false
        });
      }
      // Add predictions
      for (let i = 1; i <= 3; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        data.push({
          name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: data[data.length - 1].value + (Math.random() * 10000 - 3000),
          isPrediction: true
        });
      }
    } else if (range === '30D') {
      // 30 days with prediction
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dayOfMonth = date.getDate();
        data.push({
          name: `Day ${dayOfMonth}`,
          value: 85000 + Math.sin(dayOfMonth / 5) * 25000 + Math.random() * 15000,
          isPrediction: false
        });
      }
      // Add 5 days prediction
      for (let i = 1; i <= 5; i++) {
        data.push({
          name: `Day ${today.getDate() + i}`,
          value: data[data.length - 1].value + (Math.random() * 8000 - 2000),
          isPrediction: true
        });
      }
    } else {
      // 3 months (90 days) with prediction
      for (let i = 89; i >= 0; i -= 3) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        data.push({
          name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: 85000 + Math.sin(i / 10) * 35000 + Math.random() * 20000,
          isPrediction: false
        });
      }
      // Add 2 weeks prediction
      for (let i = 3; i <= 14; i += 3) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        data.push({
          name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: data[data.length - 1].value + (Math.random() * 12000 - 3000),
          isPrediction: true
        });
      }
    }
    
    return data;
  };

  const chartData = generateChartData(timeRange);
  const projectedBalance = chartData[chartData.length - 1].value.toFixed(0);

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

  const activeBudgets = budgets.filter(b => b.spent > 0);
  const totalRecurring = 1204;

  return (
    <div className="space-y-6">
      {/* Spending Insights */}
      <SpendingInsights />
      
      {/* Top Grid: Hero & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Financial Pulse */}
        <div className="lg:col-span-3 neumorphic-card rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group animate-slide-in-left hover-lift cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="transform group-hover:scale-110 transition-transform duration-300">
            <RadialScore score={785} />
          </div>
          <h2 className="text-lg font-semibold text-white mt-2 group-hover:text-cyan-300 transition-colors">Financial Pulse</h2>
          <p className="text-sm text-gray-400 text-center mt-2 group-hover:text-gray-300 transition-colors">Excellent standing. You are in the top 5% of savers.</p>
        </div>

        {/* Spending Forecast */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 flex flex-col min-h-[300px] animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Spending Forecast
                <span className="px-2 py-1 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 animate-pulse">AI PREDICTED</span>
              </h2>
              <p className="text-gray-300 text-sm mt-1">Projected end-of-period balance: <span className="text-white font-medium">{formatCurrency(Number(projectedBalance))}</span></p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setTimeRange('7D')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all hover:scale-105 ${
                  timeRange === '7D' 
                    ? 'bg-cyan-500/30 text-white font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] border border-cyan-400/50' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10 hover:border-cyan-400/50'
                }`}
              >
                7D
              </button>
              <button 
                onClick={() => setTimeRange('30D')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all hover:scale-105 ${
                  timeRange === '30D' 
                    ? 'bg-cyan-500/30 text-white font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] border border-cyan-400/50' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10 hover:border-cyan-400/50'
                }`}
              >
                30D
              </button>
              <button 
                onClick={() => setTimeRange('3M')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all hover:scale-105 ${
                  timeRange === '3M' 
                    ? 'bg-cyan-500/30 text-white font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] border border-cyan-400/50' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10 hover:border-cyan-400/50'
                }`}
              >
                3M
              </button>
            </div>
          </div>
          
          <div className="flex-grow w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${getCurrencySymbol()}${(value/1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 90, 142, 0.95)', 
                    borderColor: 'rgba(34, 211, 238, 0.3)', 
                    borderRadius: '12px', 
                    fontSize: '12px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                  itemStyle={{ color: '#22d3ee' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  cursor={{ stroke: '#22d3ee', strokeWidth: 1, strokeDasharray: '4 4' }}
                  formatter={(value: any, name: any, props: any) => [
                    formatCurrency(value),
                    props.payload.isPrediction ? 'Predicted' : 'Balance'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#22d3ee" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorValue)"
                  strokeDasharray="0"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight */}
        <div className="lg:col-span-3 flex flex-col gap-4 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
          <div className="flex-1 glass-panel rounded-2xl p-6 relative overflow-hidden border-l-4 border-l-purple-500/60 hover-lift cursor-pointer group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all"></div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-1.5 rounded-lg shadow-lg group-hover:shadow-purple-500/50 transition-all group-hover:scale-110">
                <Lightbulb size={14} className="text-white" />
              </div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest group-hover:text-purple-300 transition-colors">AI Insight</span>
            </div>
            <h3 className="text-lg font-bold text-white leading-snug mb-2 group-hover:text-cyan-300 transition-colors">Analysis</h3>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
               Based on your recent transactions, you are spending heavily on Dining.
            </p>
            <Link
              to="/analytics"
              className="w-full group/btn flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-cyan-500/30 border border-white/20 hover:border-cyan-400/50 transition-all text-sm font-medium text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              <span>Deep Dive</span>
              <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
            </Link>
          </div>

          <Link to="/bills" className="h-24 neumorphic-card rounded-2xl p-4 flex items-center justify-between hover-lift cursor-pointer group">
            <div>
              <p className="text-xs text-gray-300 group-hover:text-cyan-300 transition-colors">Recurring Bills</p>
              <p className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{formatCurrency(totalRecurring)}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 group-hover:scale-110 group-hover:bg-green-500/30 transition-all">
              <Calendar size={20} className="text-green-400" />
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Grid: Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Recent Transactions */}
        <div className="glass-panel rounded-2xl flex flex-col h-full max-h-[400px] animate-slide-in-left hover-lift" style={{ animationDelay: '0.3s' }}>
          <div className="p-6 pb-2 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
            <Link to="/wallet" className="text-xs text-cyan-300 hover:text-white transition-colors hover:underline">View All</Link>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {transactions.slice(0, 4).map((t, index) => (
              <div 
                key={t.id} 
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer hover:scale-[1.02] hover:shadow-lg"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-white/20 flex items-center justify-center text-white group-hover:border-cyan-400/50 group-hover:bg-cyan-500/30 transition-all group-hover:scale-110">
                    {getIcon(t.icon)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">{t.merchant}</p>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{t.date}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">{formatCurrency(Math.abs(t.amount))}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Budgets */}
        <div className="neumorphic-card rounded-2xl p-6 flex flex-col h-full animate-scale-in hover-lift" style={{ animationDelay: '0.4s' }}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Active Budgets</h3>
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.3s' }}></span>
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" style={{ animationDelay: '0.6s' }}></span>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {activeBudgets.slice(0, 3).map((b) => {
               const pct = Math.min((b.spent / b.limit) * 100, 100);
               return (
                <div key={b.id} className="group cursor-pointer">
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-2">
                      {b.category === 'Dining' && <Coffee size={14} className="text-gray-300 group-hover:text-cyan-300 transition-colors" />}
                      {b.category === 'Transport' && <Car size={14} className="text-gray-300 group-hover:text-cyan-300 transition-colors" />}
                      {b.category === 'Groceries' && <ShoppingCart size={14} className="text-gray-300 group-hover:text-cyan-300 transition-colors" />}
                      <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">{b.category}</span>
                    </div>
                    <span className="text-xs font-bold transition-all group-hover:scale-110" style={{ color: b.color }}>{Math.round(pct)}%</span>
                  </div>
                  <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden group-hover:h-3 transition-all">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 group-hover:shadow-lg" 
                      style={{ width: `${pct}%`, backgroundColor: b.color, boxShadow: `0 0 15px ${b.color}80` }}
                    ></div>
                  </div>
                  <p className="text-right text-[10px] text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">{formatCurrency(b.spent)} / {formatCurrency(b.limit)}</p>
                </div>
               );
            })}
          </div>
          <Link
            to="/planning"
            className="mt-auto w-full py-3 border border-dashed border-gray-600 text-gray-300 rounded-xl text-xs font-medium hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2 hover:scale-105"
          >
            <PlusCircle size={14} />
            Add Budget Category
          </Link>
        </div>

        {/* Savings Goals */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col h-full animate-slide-in-right hover-lift" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-lg font-bold text-white mb-4">Savings Goals</h3>
          <div className="grid grid-cols-2 gap-3">
            {savingsGoals.map((g, index) => {
              const pct = (g.current / g.target) * 100;
              const barColor = g.color === 'blue' ? 'bg-blue-500' : g.color === 'purple' ? 'bg-purple-500' : 'bg-pink-500';
              const textColor = g.color === 'blue' ? 'text-blue-400' : g.color === 'purple' ? 'text-purple-400' : 'text-pink-400';
              const bgColor = g.color === 'blue' ? 'bg-blue-500/20' : g.color === 'purple' ? 'bg-purple-500/20' : 'bg-pink-500/20';
              const hoverBg = g.color === 'blue' ? 'group-hover:bg-blue-500/30' : g.color === 'purple' ? 'group-hover:bg-purple-500/30' : 'group-hover:bg-pink-500/30';
              
              return (
                <div 
                  key={g.id} 
                  className="bg-gradient-to-br from-white/10 to-white/0 border border-white/10 rounded-2xl p-4 hover:border-cyan-400/50 transition-all group cursor-pointer relative overflow-hidden hover:scale-105 hover:shadow-lg animate-scale-in"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className={`absolute bottom-0 left-0 h-1 ${barColor} transition-all group-hover:h-[3px]`} style={{ width: `${pct}%` }}></div>
                  <div className={`w-8 h-8 rounded-full ${bgColor} ${hoverBg} flex items-center justify-center ${textColor} mb-3 transition-all group-hover:scale-110`}>
                    {getIcon(g.icon)}
                  </div>
                  <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{g.name}</p>
                  <p className="text-xs text-gray-300 group-hover:text-white transition-colors">{formatCurrency(g.current)} / {g.target >= 100000 ? formatCurrency(g.target) : formatCurrency(g.target)}</p>
                </div>
              )
            })}
            
            <div className="border border-dashed border-gray-600 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-white/10 hover:border-cyan-400 transition-all cursor-pointer text-gray-300 hover:text-cyan-300 hover:scale-105">
              <PlusCircle size={20} className="transition-transform group-hover:rotate-90" />
              <span className="text-xs font-medium">Create Goal</span>
            </div>
          </div>
          
          <div className="mt-auto pt-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-400/40 transition-all cursor-pointer group">
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb size={12} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <span className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">Tip</span>
              </div>
              <p className="text-[11px] text-gray-300 leading-tight group-hover:text-white transition-colors">Saving {formatCurrency(2000)} more weekly hits your 'Goa Trip' goal 2 months early.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
