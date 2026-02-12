import React, { ReactNode, useState } from 'react';
import { Bot } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { MobileMenu } from './components/layout/MobileMenu';
import { QuickActions } from './components/QuickActions';
import { AIChat } from './components/AIChat';
import { useTheme } from './context/ThemeContext';

interface LayoutProps {
  children: ReactNode;
  onOpenChat?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentView = location.pathname;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { theme } = useTheme();

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <div
      className={`relative min-h-screen w-full text-white overflow-x-hidden selection:bg-cyan-400 selection:text-white ${
        theme === 'light'
          ? 'bg-gradient-to-br from-[#2b78b6] via-[#3a8fd1] to-[#2d7fbd]'
          : 'bg-gradient-to-br from-[#1e5a8e] via-[#2563a8] to-[#1e5a8e]'
      }`}
    >
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[length:40px_40px] pointer-events-none z-0"></div>
      
      {/* Floating 3D Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-40 h-40 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-br from-cyan-400/30 to-blue-500/30 blur-sm animate-float shadow-[0_20px_60px_rgba(34,211,238,0.25)]"></div>
        <div className="absolute top-[20%] left-[12%] w-28 h-28 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-gradient-to-br from-blue-400/25 to-cyan-500/25 blur-sm animate-float-delayed shadow-[0_15px_50px_rgba(59,130,246,0.2)]"></div>
        <div className="absolute bottom-[15%] left-[8%] w-48 h-48 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] bg-gradient-to-br from-cyan-500/25 to-blue-600/25 blur-sm animate-float shadow-[0_25px_70px_rgba(34,211,238,0.2)]"></div>
        <div className="absolute top-[8%] right-[10%] w-32 h-32 rounded-[70%_30%_50%_50%/60%_60%_40%_40%] bg-gradient-to-br from-blue-400/30 to-cyan-400/30 blur-sm animate-float-delayed shadow-[0_18px_55px_rgba(59,130,246,0.22)]"></div>
        <div className="absolute bottom-[12%] right-[6%] w-44 h-44 rounded-[50%_50%_30%_70%/50%_50%_70%_30%] bg-gradient-to-br from-cyan-400/35 to-blue-500/35 blur-sm animate-float shadow-[0_22px_65px_rgba(34,211,238,0.25)]"></div>
        <div className="absolute top-[40%] right-[20%] w-24 h-24 rounded-[40%_60%_60%_40%/70%_30%_70%_30%] bg-gradient-to-br from-blue-300/20 to-cyan-300/20 blur-sm animate-float-delayed shadow-[0_12px_40px_rgba(147,197,253,0.18)]"></div>
        <div className="absolute bottom-[30%] right-[3%] w-36 h-36 rounded-[60%_40%_40%_60%/50%_60%_40%_50%] bg-gradient-to-br from-cyan-500/30 to-blue-400/30 blur-sm animate-float shadow-[0_20px_60px_rgba(34,211,238,0.23)]"></div>
        <div className="absolute top-[50%] left-[15%] w-32 h-32 rounded-[50%_50%_50%_50%/60%_40%_60%_40%] bg-gradient-to-br from-blue-500/25 to-cyan-400/25 blur-sm animate-float-delayed shadow-[0_18px_55px_rgba(59,130,246,0.2)]"></div>
      </div>

      {/* Main Container */}
      <div className="relative flex flex-col min-h-screen z-10">
        <Header onOpenChat={handleOpenChat} />

        {/* Content */}
        <main className="flex-grow p-6 md:p-8 lg:p-10 max-w-[1400px] mx-auto w-full">
          {children}
        </main>

        <MobileMenu onOpenChat={handleOpenChat} />
        
        {/* Quick Actions Menu */}
        <QuickActions />
        
        {/* AI Chat */}
        <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        
        {/* Floating Chat Button (Desktop) */}
        {currentView !== '/settings' && (
          <button
            onClick={handleOpenChat}
            className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.6)] flex items-center justify-center hover:scale-110 transition-all duration-300 group animate-float hidden md:flex"
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
