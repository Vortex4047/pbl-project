import React, { useState } from 'react';
import { Plus, TrendingUp, Target, Zap, CreditCard, Repeat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    { 
      icon: <Plus size={20} />, 
      label: 'Add Transaction', 
      color: 'from-cyan-500 to-blue-600',
      onClick: () => { navigate('/wallet'); setIsOpen(false); }
    },
    { 
      icon: <TrendingUp size={20} />, 
      label: 'New Budget', 
      color: 'from-purple-500 to-pink-600',
      onClick: () => { navigate('/planning'); setIsOpen(false); }
    },
    { 
      icon: <Target size={20} />, 
      label: 'Create Goal', 
      color: 'from-green-500 to-emerald-600',
      onClick: () => { navigate('/planning'); setIsOpen(false); }
    },
    { 
      icon: <Repeat size={20} />, 
      label: 'Add Recurring', 
      color: 'from-blue-500 to-indigo-600',
      onClick: () => { navigate('/recurring'); setIsOpen(false); }
    },
    { 
      icon: <CreditCard size={20} />, 
      label: 'Track Debt', 
      color: 'from-red-500 to-pink-600',
      onClick: () => { navigate('/debt'); setIsOpen(false); }
    },
  ];

  return (
    <>
      {/* Quick Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-8 z-40 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.6)] flex items-center justify-center hover:scale-110 transition-all duration-300 group"
      >
        <Zap size={24} className={`text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Action Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bottom-40 right-8 z-40 flex flex-col gap-3 animate-in slide-in-from-bottom-4 duration-300">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={`flex items-center gap-3 px-4 py-3 bg-gradient-to-r ${action.color} text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 group animate-in slide-in-from-right-4`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                  {action.icon}
                </div>
                <span className="font-medium pr-2">{action.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};
