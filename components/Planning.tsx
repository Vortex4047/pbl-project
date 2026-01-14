import React from 'react';
import { BUDGETS, SAVINGS_GOALS } from '../constants';
import { Plus, Target, Wallet } from 'lucide-react';

export const Planning: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Financial Planning</h2>
          <p className="text-gray-400 text-sm">Set budgets and track savings goals.</p>
        </div>
      </div>

      {/* Budgets Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Wallet size={20} className="text-primary" />
            Monthly Budgets
          </h3>
          <button className="text-sm text-primary hover:text-white transition-colors flex items-center gap-1">
            <Plus size={16} /> Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BUDGETS.map((b) => {
             const pct = Math.min((b.spent / b.limit) * 100, 100);
             return (
              <div key={b.id} className="neumorphic-card p-6 rounded-2xl relative overflow-hidden group">
                 <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <h4 className="font-bold text-white text-lg">{b.category}</h4>
                      <p className="text-xs text-gray-400">Resets in 12 days</p>
                    </div>
                    <div className="text-right">
                       <span className="text-2xl font-bold text-white">${b.spent}</span>
                       <span className="text-sm text-gray-500"> / ${b.limit}</span>
                    </div>
                 </div>
                 
                 <div className="relative h-4 w-full bg-black/40 rounded-full overflow-hidden mb-2 z-10">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${pct}%`, backgroundColor: b.color }}
                    ></div>
                 </div>

                 {/* Warning if over 80% */}
                 {pct > 80 && (
                   <div className="flex items-center gap-2 mt-2 text-red-400 text-xs font-medium z-10 relative">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                      Approaching limit
                   </div>
                 )}

                 {/* Decorative background blur */}
                 <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20" style={{ backgroundColor: b.color }}></div>
              </div>
             );
          })}
        </div>
      </section>

      {/* Savings Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Target size={20} className="text-secondary" />
            Long-term Goals
          </h3>
          <button className="text-sm text-secondary hover:text-white transition-colors flex items-center gap-1">
            <Plus size={16} /> New Goal
          </button>
        </div>

        <div className="glass-panel rounded-2xl p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               {SAVINGS_GOALS.map((g) => {
                  const pct = Math.round((g.current / g.target) * 100);
                  return (
                    <div key={g.id} className="bg-white/5 rounded-xl p-5 border border-white/5 hover:border-secondary/30 transition-colors flex flex-col items-center text-center">
                       <div className="relative w-32 h-32 mb-4">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="6" />
                            <circle 
                              cx="50" cy="50" r="45" fill="none" stroke={g.color === 'blue' ? '#3b82f6' : g.color === 'purple' ? '#a855f7' : '#ec4899'} 
                              strokeWidth="6" 
                              strokeDasharray={283}
                              strokeDashoffset={283 - (pct / 100 * 283)}
                              strokeLinecap="round"
                              className="transition-all duration-1000"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center flex-col">
                             <span className="text-2xl font-bold text-white">{pct}%</span>
                          </div>
                       </div>
                       <h4 className="font-bold text-white">{g.name}</h4>
                       <p className="text-sm text-gray-400 mt-1">${g.current} of ${g.target}</p>
                    </div>
                  )
               })}
            </div>
        </div>
      </section>
    </div>
  );
};