import React, { useState } from 'react';
import { Bot, LayoutDashboard, Wallet, PieChart, User, BarChart3, Repeat, CreditCard, TrendingUp, DollarSign, ChevronDown, Calculator, Award, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NotificationCenter } from '../NotificationCenter';

interface HeaderProps {
    onOpenChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenChat }) => {
    const location = useLocation();
    const currentView = location.pathname;
    const [isToolsOpen, setIsToolsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/dashboard" className="flex items-center gap-3 cursor-pointer group">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-white/20 group-hover:scale-105 transition-transform">
                        <Bot className="text-cyan-300" size={24} />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white">Finance Mentor <span className="text-cyan-300">AI</span></h1>
                </Link>

                <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                    <Link
                        to="/dashboard"
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all ${currentView === '/dashboard'
                            ? 'bg-cyan-500/30 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                            : 'text-gray-200 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <LayoutDashboard size={16} />
                        Dashboard
                    </Link>
                    <Link
                        to="/wallet"
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all ${currentView === '/wallet'
                            ? 'bg-cyan-500/30 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                            : 'text-gray-200 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <Wallet size={16} />
                        Wallet
                    </Link>
                    <Link
                        to="/planning"
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all ${currentView === '/planning'
                            ? 'bg-cyan-500/30 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                            : 'text-gray-200 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <PieChart size={16} />
                        Planning
                    </Link>
                    <Link
                        to="/analytics"
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all ${currentView === '/analytics'
                            ? 'bg-cyan-500/30 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                            : 'text-gray-200 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <BarChart3 size={16} />
                        Analytics
                    </Link>
                    <Link
                        to="/investments"
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all ${currentView === '/investments'
                            ? 'bg-cyan-500/30 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                            : 'text-gray-200 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <TrendingUp size={16} />
                        Invest
                    </Link>
                    <Link
                        to="/debt"
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all ${currentView === '/debt'
                            ? 'bg-cyan-500/30 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                            : 'text-gray-200 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <CreditCard size={16} />
                        Debt
                    </Link>
                    <Link
                        to="/bills"
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all ${currentView === '/bills'
                            ? 'bg-cyan-500/30 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                            : 'text-gray-200 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <DollarSign size={16} />
                        Bills
                    </Link>
                    
                    {/* Tools Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsToolsOpen(!isToolsOpen)}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                                ['/tax-planner', '/credit-score', '/emi-calculator'].includes(currentView)
                                    ? 'bg-cyan-500/30 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            <Calculator size={16} />
                            Tools
                            <ChevronDown size={14} className={`transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isToolsOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 glass-panel-blue border border-white/20 rounded-xl shadow-2xl z-50 animate-scale-in">
                                <Link
                                    to="/tax-planner"
                                    onClick={() => setIsToolsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-all first:rounded-t-xl"
                                >
                                    <FileText size={16} className="text-cyan-400" />
                                    <span className="text-sm text-white">Tax Planner</span>
                                </Link>
                                <Link
                                    to="/credit-score"
                                    onClick={() => setIsToolsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-all"
                                >
                                    <Award size={16} className="text-cyan-400" />
                                    <span className="text-sm text-white">Credit Score</span>
                                </Link>
                                <Link
                                    to="/emi-calculator"
                                    onClick={() => setIsToolsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-all last:rounded-b-xl"
                                >
                                    <Calculator size={16} className="text-cyan-400" />
                                    <span className="text-sm text-white">EMI Calculator</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>

                <div className="flex items-center gap-4">
                    {/* Mobile Chat Trigger */}
                    <button
                        onClick={onOpenChat}
                        className="md:hidden p-2 text-cyan-300 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Bot size={24} />
                    </button>

                    <NotificationCenter />

                    <Link
                        to="/settings"
                        className={`w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600/40 to-blue-600/40 border-2 overflow-hidden shadow-lg flex items-center justify-center transition-all ${currentView === '/settings' ? 'border-cyan-400 ring-2 ring-cyan-400/30' : 'border-white/30 hover:border-cyan-300'}`}
                    >
                        <User size={20} className="text-white" />
                    </Link>
                </div>
            </div>
        </header>
    );
};
