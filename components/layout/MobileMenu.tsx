import React from 'react';
import { Bot, LayoutDashboard, Wallet, PieChart, BarChart3, Repeat, CreditCard, TrendingUp, DollarSign } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MobileMenuProps {
    onOpenChat: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ onOpenChat }) => {
    const location = useLocation();
    const currentView = location.pathname;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
            <div className="flex justify-around glass-panel border-t border-white/20 overflow-x-auto">
                <Link to="/dashboard" className={`flex-1 flex flex-col items-center py-3 text-xs transition-colors min-w-[60px] ${currentView === '/dashboard' ? 'text-cyan-300' : 'text-gray-200 hover:text-white'}`}>
                    <LayoutDashboard size={20} />
                    <span className="mt-1">Home</span>
                </Link>
                <Link to="/wallet" className={`flex-1 flex flex-col items-center py-3 text-xs transition-colors min-w-[60px] ${currentView === '/wallet' ? 'text-cyan-300' : 'text-gray-200 hover:text-white'}`}>
                    <Wallet size={20} />
                    <span className="mt-1">Wallet</span>
                </Link>
                <Link to="/analytics" className={`flex-1 flex flex-col items-center py-3 text-xs transition-colors min-w-[60px] ${currentView === '/analytics' ? 'text-cyan-300' : 'text-gray-200 hover:text-white'}`}>
                    <BarChart3 size={20} />
                    <span className="mt-1">Stats</span>
                </Link>
                <Link to="/investments" className={`flex-1 flex flex-col items-center py-3 text-xs transition-colors min-w-[60px] ${currentView === '/investments' ? 'text-cyan-300' : 'text-gray-200 hover:text-white'}`}>
                    <TrendingUp size={20} />
                    <span className="mt-1">Invest</span>
                </Link>
                <Link to="/debt" className={`flex-1 flex flex-col items-center py-3 text-xs transition-colors min-w-[60px] ${currentView === '/debt' ? 'text-cyan-300' : 'text-gray-200 hover:text-white'}`}>
                    <CreditCard size={20} />
                    <span className="mt-1">Debt</span>
                </Link>
                <button onClick={onOpenChat} className="flex-1 flex flex-col items-center py-3 text-xs text-gray-200 hover:text-white transition-colors min-w-[60px]">
                    <Bot size={20} />
                    <span className="mt-1">Chat</span>
                </button>
            </div>
        </div>
    );
};
