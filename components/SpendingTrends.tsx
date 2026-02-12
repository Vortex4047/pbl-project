import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export const SpendingTrends: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const { formatCurrency } = useCurrency();

  const data = {
    '7d': [
      { date: 'Mon', Dining: 45, Transport: 20, Shopping: 30 },
      { date: 'Tue', Dining: 52, Transport: 15, Shopping: 25 },
      { date: 'Wed', Dining: 38, Transport: 25, Shopping: 40 },
      { date: 'Thu', Dining: 60, Transport: 18, Shopping: 35 },
      { date: 'Fri', Dining: 70, Transport: 22, Shopping: 50 },
      { date: 'Sat', Dining: 85, Transport: 30, Shopping: 80 },
      { date: 'Sun', Dining: 65, Transport: 10, Shopping: 45 },
    ],
    '30d': [
      { date: 'Week 1', Dining: 280, Transport: 120, Shopping: 200 },
      { date: 'Week 2', Dining: 320, Transport: 90, Shopping: 250 },
      { date: 'Week 3', Dining: 290, Transport: 110, Shopping: 180 },
      { date: 'Week 4', Dining: 350, Transport: 130, Shopping: 220 },
    ],
    '90d': [
      { date: 'Month 1', Dining: 1200, Transport: 450, Shopping: 850 },
      { date: 'Month 2', Dining: 1100, Transport: 420, Shopping: 900 },
      { date: 'Month 3', Dining: 1300, Transport: 480, Shopping: 950 },
    ],
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel-blue border border-white/30 p-3 rounded-lg">
          <p className="text-white font-bold mb-2">{payload[0].payload.date}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(Number(entry.value))}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const totalSpend = data[timeRange].reduce(
    (sum, point) => sum + point.Dining + point.Transport + point.Shopping,
    0
  );
  const totalDays = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
  const avgDaily = totalSpend / totalDays;

  return (
    <div className="glass-panel p-6 rounded-2xl hover-lift">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp size={24} className="text-cyan-400" />
            Spending Trends
          </h3>
          <p className="text-sm text-gray-300 mt-1">Track your spending patterns over time</p>
        </div>
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-cyan-500/30 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data[timeRange]}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.5)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => formatCurrency(Number(value))}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: '#fff' }}
              iconType="circle"
            />
            <Line 
              type="monotone" 
              dataKey="Dining" 
              stroke="#22d3ee" 
              strokeWidth={3}
              dot={{ fill: '#22d3ee', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="Transport" 
              stroke="#a855f7" 
              strokeWidth={3}
              dot={{ fill: '#a855f7', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="Shopping" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Calendar size={14} className="text-cyan-400" />
            <p className="text-sm text-gray-300">Peak Day</p>
          </div>
          <p className="text-lg font-bold text-white">Saturday</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-300 mb-1">Avg Daily</p>
          <p className="text-lg font-bold text-cyan-400">{formatCurrency(avgDaily, 2)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-300 mb-1">Trend</p>
          <p className="text-lg font-bold text-green-400">↓ 8%</p>
        </div>
      </div>
    </div>
  );
};
