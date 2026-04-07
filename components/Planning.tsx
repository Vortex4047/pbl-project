import React, { useState } from 'react';
import { Plus, Target, Wallet, X, PlusCircle, TrendingUp, CheckCircle } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useCurrency } from '../context/CurrencyContext';

export const Planning: React.FC = () => {
  const { formatCurrency } = useCurrency();
  const { budgets, savingsGoals, addBudget, addSavingsGoal, updateSavingsGoalProgress } = useFinance();
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showGoalModal,   setShowGoalModal]   = useState(false);
  const [contributeGoalId, setContributeGoalId] = useState<string | null>(null);
  const [contributeAmount,  setContributeAmount]  = useState('');
  const [contributed, setContributed] = useState<string | null>(null); // goal id just contributed

  // Budget form state
  const [budgetCategory, setBudgetCategory] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');

  // Savings goal form state
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalIcon, setGoalIcon] = useState('target');
  const [goalColor, setGoalColor] = useState('blue');

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (budgetCategory && budgetLimit) {
      addBudget({
        category: budgetCategory,
        spent: 0,
        limit: parseFloat(budgetLimit),
        color: '#' + Math.floor(Math.random()*16777215).toString(16), // Random color
      });
      setBudgetCategory('');
      setBudgetLimit('');
      setShowBudgetModal(false);
    }
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (goalName && goalTarget) {
      addSavingsGoal({
        name: goalName,
        current: 0,
        target: parseFloat(goalTarget),
        icon: goalIcon,
        color: goalColor,
      });
      setGoalName('');
      setGoalTarget('');
      setGoalIcon('target');
      setGoalColor('blue');
      setShowGoalModal(false);
    }
  };

  const handleContribute = () => {
    if (!contributeGoalId || !contributeAmount || isNaN(Number(contributeAmount))) return;
    updateSavingsGoalProgress(contributeGoalId, parseFloat(contributeAmount));
    setContributed(contributeGoalId);
    setTimeout(() => setContributed(null), 2500);
    setContributeAmount('');
    setContributeGoalId(null);
  };

  // Estimate months to completion based on a fixed ₹5,000/month contribution rate
  const estimateMonths = (current: number, target: number): string => {
    const remaining = target - current;
    if (remaining <= 0) return 'Achieved! 🎉';
    const months = Math.ceil(remaining / 5000);
    if (months <= 1) return 'Next month';
    if (months > 60) return '5+ years';
    const years = Math.floor(months / 12);
    const rem   = months % 12;
    if (years === 0) return `~${months} months`;
    return `~${years}y ${rem}m`;
  };

  const getMilestone = (pct: number): string | null => {
    if (pct >= 100) return '🏆 Complete!';
    if (pct >= 75)  return '🔥 75%';
    if (pct >= 50)  return '⚡ Halfway!';
    if (pct >= 25)  return '🌱 25%';
    return null;
  };

  return (
    <div className="space-y-8 animate-slide-in-left">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Financial Planning</h2>
          <p className="text-gray-300 text-sm">Set budgets and track savings goals.</p>
        </div>
      </div>

      {/* Budgets Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Wallet size={20} className="text-cyan-400" />
            Monthly Budgets
          </h3>
          <button 
            onClick={() => setShowBudgetModal(true)}
            className="text-sm text-cyan-300 hover:text-white transition-colors flex items-center gap-1 hover:scale-105"
          >
            <Plus size={16} /> Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgets.map((b, index) => {
             const pct = Math.min((b.spent / b.limit) * 100, 100);
             return (
              <div 
                key={b.id} 
                className="neumorphic-card p-6 rounded-2xl relative overflow-hidden group hover-lift cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                 <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <h4 className="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors">{b.category}</h4>
                      <p className="text-xs text-gray-300 group-hover:text-white transition-colors">Resets in 12 days</p>
                    </div>
                    <div className="text-right">
                       <span className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">{formatCurrency(b.spent)}</span>
                       <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors"> / {formatCurrency(b.limit)}</span>
                    </div>
                 </div>
                 
                 <div className="relative h-4 w-full bg-black/40 rounded-full overflow-hidden mb-2 z-10 group-hover:h-5 transition-all">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 group-hover:shadow-lg" 
                      style={{ width: `${pct}%`, backgroundColor: b.color, boxShadow: `0 0 20px ${b.color}80` }}
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
            <Target size={20} className="text-purple-400" />
            Long-term Goals
          </h3>
          <button 
            onClick={() => setShowGoalModal(true)}
            className="text-sm text-purple-400 hover:text-white transition-colors flex items-center gap-1 hover:scale-105"
          >
            <Plus size={16} /> New Goal
          </button>
        </div>

        <div className="glass-panel rounded-2xl p-6 hover-lift">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           {savingsGoals.map((g, index) => {
                  const pct = Math.round((g.current / g.target) * 100);
                  const colorMap: Record<string, string> = {
                    blue: '#3b82f6',
                    purple: '#a855f7',
                    pink: '#ec4899',
                    green: '#22c55e',
                    yellow: '#eab308',
                  };
                  const strokeColor = colorMap[g.color] || '#3b82f6';
                  const milestone = getMilestone(pct);
                  const isJustContributed = contributed === g.id;
                  
                  return (
                    <div 
                      key={g.id} 
                      className="bg-white/10 rounded-xl p-5 border border-white/20 hover:border-cyan-400/50 hover:bg-white/15 transition-all flex flex-col items-center text-center group hover:scale-105 animate-scale-in relative"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                       {/* Milestone badge */}
                       {milestone && (
                         <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-white/20 text-white animate-pulse">
                           {milestone}
                         </span>
                       )}

                       <div className="relative w-32 h-32 mb-4">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                            <circle 
                              cx="50" cy="50" r="45" fill="none" stroke={strokeColor} 
                              strokeWidth="6" 
                              strokeDasharray={283}
                              strokeDashoffset={283 - (pct / 100 * 283)}
                              strokeLinecap="round"
                              className="transition-all duration-1000"
                              style={{ filter: `drop-shadow(0 0 6px ${strokeColor})` }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center flex-col">
                             {isJustContributed ? (
                               <CheckCircle size={28} className="text-green-400 animate-bounce" />
                             ) : (
                               <span className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">{pct}%</span>
                             )}
                          </div>
                       </div>
                       <h4 className="font-bold text-white group-hover:text-cyan-300 transition-colors">{g.name}</h4>
                       <p className="text-sm text-gray-300 mt-1 group-hover:text-white transition-colors">{formatCurrency(g.current)} of {formatCurrency(g.target)}</p>
                       
                       {/* Estimated completion */}
                       <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                         <TrendingUp size={10} className="text-cyan-400" />
                         <span>{estimateMonths(g.current, g.target)}</span>
                       </div>

                       {/* Contribute button */}
                       {pct < 100 && (
                         <button
                           onClick={() => { setContributeGoalId(g.id); setContributeAmount(''); }}
                           className="mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border border-cyan-400/30 text-cyan-300 text-xs rounded-lg transition-all hover:scale-105"
                         >
                           <PlusCircle size={12} />
                           Add Funds
                         </button>
                       )}
                    </div>
                  )
               })}
            </div>
        </div>
      </section>

      {/* Add Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel-blue border-2 border-white/30 p-6 rounded-2xl w-full max-w-md mx-4 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Add Budget Category</h3>
              <button 
                onClick={() => setShowBudgetModal(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-300" />
              </button>
            </div>
            <form onSubmit={handleAddBudget} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Category Name</label>
                <input
                  type="text"
                  value={budgetCategory}
                  onChange={(e) => setBudgetCategory(e.target.value)}
                  placeholder="e.g., Entertainment, Utilities"
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Monthly Limit</label>
                <input
                  type="number"
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(e.target.value)}
                  placeholder="e.g., 500"
                  min="0"
                  step="0.01"
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-gray-500"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBudgetModal(false)}
                  className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] rounded-xl text-white font-medium transition-all hover:scale-105"
                >
                  Add Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Savings Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel-blue border-2 border-white/30 p-6 rounded-2xl w-full max-w-md mx-4 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Add Savings Goal</h3>
              <button 
                onClick={() => setShowGoalModal(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-300" />
              </button>
            </div>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Goal Name</label>
                <input
                  type="text"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="e.g., Emergency Fund, Vacation"
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all placeholder:text-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Target Amount</label>
                <input
                  type="number"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(e.target.value)}
                  placeholder="e.g., 10000"
                  min="0"
                  step="0.01"
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all placeholder:text-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Color</label>
                <div className="flex gap-2">
                  {['blue', 'purple', 'pink', 'green', 'yellow'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setGoalColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
                        goalColor === color ? 'border-white scale-110 ring-2 ring-white/50' : 'border-white/30'
                      }`}
                      style={{ 
                        backgroundColor: color === 'blue' ? '#3b82f6' : 
                                       color === 'purple' ? '#a855f7' : 
                                       color === 'pink' ? '#ec4899' :
                                       color === 'green' ? '#22c55e' : '#eab308'
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] rounded-xl text-white font-medium transition-all hover:scale-105"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contribution Modal */}
      {contributeGoalId && (() => {
        const goal = savingsGoals.find(g => g.id === contributeGoalId);
        if (!goal) return null;
        const remaining = goal.target - goal.current;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
            <div className="glass-panel-blue border-2 border-white/30 p-6 rounded-2xl w-full max-w-sm mx-4 animate-slide-up shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Add Funds</h3>
                <button onClick={() => setContributeGoalId(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} className="text-gray-300" />
                </button>
              </div>
              <p className="text-sm text-gray-300 mb-1">Goal: <span className="text-white font-semibold">{goal.name}</span></p>
              <p className="text-xs text-gray-400 mb-5">
                {formatCurrency(goal.current)} saved · {formatCurrency(remaining)} remaining
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">Amount to Add (₹)</label>
                <input
                  type="number"
                  value={contributeAmount}
                  onChange={e => setContributeAmount(e.target.value)}
                  placeholder="e.g., 5000"
                  min="1"
                  max={remaining}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400/50 placeholder-gray-600"
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && handleContribute()}
                />
              </div>
              {/* Quick amounts */}
              <div className="flex gap-2 mb-5">
                {[1000, 5000, 10000].filter(v => v <= remaining).map(v => (
                  <button
                    key={v}
                    onClick={() => setContributeAmount(String(v))}
                    className="flex-1 py-1.5 text-xs bg-white/10 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-gray-300 hover:text-cyan-300 rounded-lg transition-all"
                  >
                    +₹{v.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setContributeGoalId(null)}
                  className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContribute}
                  disabled={!contributeAmount || Number(contributeAmount) <= 0}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] rounded-xl text-white font-medium transition-all hover:scale-105 disabled:opacity-40"
                >
                  Contribute
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
