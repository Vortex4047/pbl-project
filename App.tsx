import React, { useEffect, useState } from 'react';
import { FinanceProvider } from './context/FinanceContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { Layout } from './Layout';
import { Auth } from './components/Auth';
import { User } from './types';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const forceLogin = params.get('login') === '1';
      if (forceLogin) {
        localStorage.removeItem('finance_user');
        return null;
      }

      const storedUser = localStorage.getItem('finance_user');
      if (!storedUser) {
        return null;
      }
      const parsedUser = JSON.parse(storedUser) as User;
      if (parsedUser?.email && parsedUser?.name) {
        return parsedUser;
      }
    } catch (error) {
      console.error('Failed to parse stored user:', error);
    }
    return null;
  });

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleSignup = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('finance_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('finance_user');
      }
    } catch (error) {
      console.error('Failed to persist user session:', error);
    }
  }, [user]);

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <FinanceProvider>
          {!user ? (
            <Auth onLogin={handleLogin} onSignup={handleSignup} />
          ) : (
            <Layout>
              <Outlet context={{ user, onLogout: handleLogout }} />
            </Layout>
          )}
        </FinanceProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
