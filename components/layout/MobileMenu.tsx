import React from 'react';
import { LayoutDashboard, Wallet, BarChart3, TrendingUp, Bot, PieChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MobileMenuProps {
  onOpenChat: () => void;
}

const TABS = [
  { to: '/dashboard',   icon: LayoutDashboard, label: 'Home'     },
  { to: '/wallet',      icon: Wallet,          label: 'Wallet'   },
  { to: '/analytics',   icon: BarChart3,       label: 'Analytics'},
  { to: '/planning',    icon: PieChart,        label: 'Planning' },
  { to: '/investments', icon: TrendingUp,      label: 'Invest'   },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ onOpenChat }) => {
  const location = useLocation();
  const currentView = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden safe-area-bottom">
      <div className="flex glass-panel border-t border-white/20">
        {TABS.map(({ to, icon: Icon, label }) => {
          const isActive = currentView === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center py-3 gap-0.5 text-[11px] font-medium transition-all ${
                isActive ? 'text-cyan-300' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-cyan-500/20' : ''}`}>
                <Icon size={19} />
              </div>
              <span>{label}</span>
            </Link>
          );
        })}
        <button
          onClick={onOpenChat}
          className="flex-1 flex flex-col items-center py-3 gap-0.5 text-[11px] font-medium text-gray-400 hover:text-cyan-300 transition-all"
        >
          <div className="p-1.5 rounded-xl">
            <Bot size={19} />
          </div>
          <span>AI Chat</span>
        </button>
      </div>
    </div>
  );
};
