import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_DATA } from '../../constants';

export const Chart: React.FC = () => {
    return (
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
                                <stop offset="5%" stopColor="#00b8c2" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#00b8c2" stopOpacity={0} />
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
    );
};
