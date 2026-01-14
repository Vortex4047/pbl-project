import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { Dashboard } from './components/Dashboard';
import { Wallet } from './components/Wallet';
import { Planning } from './components/Planning';
import { Settings } from './components/Settings';
import { Auth } from './components/Auth';
import { Onboarding } from './components/Onboarding';
import { AIChat } from './components/AIChat';
import { ViewState, User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState<string>('');

  // Simulating a check for existing session
  useEffect(() => {
    // In a real app, check localStorage or cookie
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setShowOnboarding(false); // Assume existing user is onboarded
    setCurrentView('dashboard');
  };

  const handleSignup = (newUser: User) => {
    setUser(newUser);
    setShowOnboarding(true); // New users see onboarding
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
    setIsChatOpen(false);
  };

  const handleAskAI = (query: string) => {
    setChatInitialMessage(query);
    setIsChatOpen(true);
  };

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Unauthenticated State
  if (!user) {
    return <Auth onLogin={handleLogin} onSignup={handleSignup} />;
  }

  // 2. Onboarding State
  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  // 3. Main Authenticated App
  return (
    <Layout 
      currentView={currentView} 
      onChangeView={handleNavigate}
      onOpenChat={() => setIsChatOpen(true)}
    >
      {currentView === 'dashboard' && (
        <Dashboard 
          onAskAI={handleAskAI} 
          onNavigate={handleNavigate} 
        />
      )}
      {currentView === 'wallet' && <Wallet />}
      {currentView === 'planning' && <Planning />}
      {currentView === 'settings' && <Settings user={user} onLogout={handleLogout} />}

      <AIChat 
        isOpen={isChatOpen} 
        onClose={() => {
            setIsChatOpen(false);
            setChatInitialMessage(''); 
        }}
        initialMessage={chatInitialMessage}
      />
    </Layout>
  );
}

export default App;