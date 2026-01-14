import React, { ReactNode } from 'react';
import { Bot, LayoutDashboard, Wallet, PieChart, BarChart3, Bell, User } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentView: string;
  onChangeView: (view: any) => void;
  onOpenChat: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView, onOpenChat }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#18181b] text-white overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute top-[10%] -right-[5%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] animate-float-delayed"></div>
      </div>

      {/* Main Container */}
      <div className="relative flex flex-col min-h-screen z-10">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full glass-panel border-b-0 border-b-white/5 bg-[#18181b]/70">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onChangeView('dashboard')}>
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10">
                <Bot className="text-primary" size={24} />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">Finance Mentor <span className="text-primary">AI</span></h1>
            </div>

            <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
              <button 
                onClick={() => onChangeView('dashboard')}
                className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-all ${
                  currentView === 'dashboard' 
                  ? 'bg-primary/20 text-white shadow-[0_0_15px_rgba(0,184,194,0.3)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </button>
              <button 
                onClick={() => onChangeView('wallet')}
                className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-all ${
                  currentView === 'wallet' 
                  ? 'bg-primary/20 text-white shadow-[0_0_15px_rgba(0,184,194,0.3)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Wallet size={16} />
                Wallet
              </button>
              <button 
                onClick={() => onChangeView('planning')}
                className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-all ${
                  currentView === 'planning' 
                  ? 'bg-primary/20 text-white shadow-[0_0_15px_rgba(0,184,194,0.3)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <PieChart size={16} />
                Planning
              </button>
            </nav>

            <div className="flex items-center gap-4">
               {/* Mobile Chat Trigger */}
              <button 
                onClick={onOpenChat}
                className="md:hidden p-2 text-primary hover:bg-white/5 rounded-full"
              >
                <Bot size={24} />
              </button>

              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              
              <button 
                onClick={() => onChangeView('settings')}
                className={`w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 border-2 overflow-hidden shadow-lg flex items-center justify-center transition-all ${currentView === 'settings' ? 'border-primary ring-2 ring-primary/20' : 'border-primary/30 hover:border-white'}`}
              >
                 <User size={20} className="text-gray-300" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow p-6 md:p-8 lg:p-10 max-w-[1400px] mx-auto w-full">
          {children}
        </main>
        
        {/* Floating Chat Button (Desktop) */}
        {currentView !== 'settings' && (
          <button 
            onClick={onOpenChat}
            className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_20px_rgba(139,0,255,0.5)] flex items-center justify-center hover:scale-105 transition-transform group"
          >
            <Bot size={28} className="text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};