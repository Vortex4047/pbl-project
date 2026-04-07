import React, { ReactNode, useState } from 'react';
import { Bot } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
      className="relative min-h-screen w-full text-text overflow-x-hidden selection:bg-cta selection:text-white bg-background"
    >
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:40px_40px] pointer-events-none z-0"></div>
      
      {/* Floating 3D Background Objects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-40 h-40 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-br from-primary/20 to-cta/20 blur-2xl animate-float shadow-[0_20px_60px_rgba(245,158,11,0.1)]"></div>
        <div className="absolute top-[20%] left-[12%] w-28 h-28 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-gradient-to-br from-secondary/20 to-cta/20 blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-[15%] left-[8%] w-48 h-48 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] bg-gradient-to-br from-cta/20 to-primary/20 blur-2xl animate-float"></div>
        <div className="absolute top-[8%] right-[10%] w-32 h-32 rounded-[70%_30%_50%_50%/60%_60%_40%_40%] bg-gradient-to-br from-secondary/10 to-primary/10 blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-[12%] right-[6%] w-44 h-44 rounded-[50%_50%_30%_70%/50%_50%_70%_30%] bg-gradient-to-br from-primary/15 to-cta/15 blur-2xl animate-float"></div>
        <div className="absolute top-[40%] right-[20%] w-24 h-24 rounded-[40%_60%_60%_40%/70%_30%_70%_30%] bg-gradient-to-br from-cta/15 to-primary/10 blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-[30%] right-[3%] w-36 h-36 rounded-[60%_40%_40%_60%/50%_60%_40%_50%] bg-gradient-to-br from-primary/20 to-secondary/10 blur-2xl animate-float"></div>
        <div className="absolute top-[50%] left-[15%] w-32 h-32 rounded-[50%_50%_50%_50%/60%_40%_60%_40%] bg-gradient-to-br from-secondary/15 to-cta/15 blur-2xl animate-float-delayed"></div>
      </div>

      {/* Main Container */}
      <div className="relative flex flex-col min-h-screen z-10">
        <Header onOpenChat={handleOpenChat} />

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.main 
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow p-6 md:p-8 lg:p-10 max-w-[1400px] mx-auto w-full"
          >
            {children}
          </motion.main>
        </AnimatePresence>

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
