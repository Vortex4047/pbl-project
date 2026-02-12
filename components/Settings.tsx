import React, { useState } from 'react';
import { User, Bell, Shield, Wallet, LogOut, ChevronRight, Globe, CreditCard, Trash2, Plus } from 'lucide-react';
import { User as UserType } from '../types';
import { useOutletContext } from 'react-router-dom';
import { DataExportImport } from './DataExportImport';
import { Currency, SUPPORTED_CURRENCIES, useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';

type OutletContextType = {
  user: UserType | null;
  onLogout: () => void;
}

export const Settings: React.FC = () => {
  const { user, onLogout } = useOutletContext<OutletContextType>();
  const { currency, setCurrency } = useCurrency();
  const { theme, setTheme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    weeklyReports: true,
    unusualSpending: true,
    marketingEmails: false
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-slide-in-left">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Settings & Preferences</h2>
        <p className="text-gray-300 text-sm">Manage your profile and application settings.</p>
      </div>

      {/* Profile Card */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 hover-lift">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-600/40 to-blue-600/40 border-4 border-white/20 shadow-xl flex items-center justify-center text-3xl font-bold text-white">
            {user?.name.charAt(0) || 'U'}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full border-4 border-[#1e5a8e] hover:scale-110 transition-all shadow-lg">
            <Plus size={14} />
          </button>
        </div>
        <div className="flex-1 text-center md:text-left space-y-1">
          <h3 className="text-xl font-bold text-white">{user?.name || 'User'}</h3>
          <p className="text-gray-300">{user?.email || 'email@example.com'}</p>
          <div className="pt-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-medium border border-cyan-500/30">Pro Member</span>
          </div>
        </div>
        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-medium transition-all hover:scale-105">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Sidebar Nav */}
        <div className="md:col-span-4 space-y-2">
          <div className="p-1 rounded-xl bg-white/10 border border-white/20">
             {['General', 'Notifications', 'Security', 'Connected Accounts'].map((item, i) => (
               <button key={i} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${i === 0 ? 'bg-cyan-500/30 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'text-gray-200 hover:text-white hover:bg-white/10'}`}>
                 {item}
                 {i === 0 && <ChevronRight size={14} />}
               </button>
             ))}
          </div>
          
          <button 
            onClick={onLogout}
            className="w-full mt-4 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all flex items-center gap-3 text-sm font-medium hover:scale-105"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Preferences */}
          <section className="glass-panel rounded-2xl overflow-hidden hover-lift">
            <div className="p-4 border-b border-white/10 bg-white/5">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Globe size={18} className="text-cyan-400" />
                Preferences
              </h4>
            </div>
            <div className="divide-y divide-white/10">
               <div className="p-4 flex items-center justify-between group hover:bg-white/5 transition-all">
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">Currency</p>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Select your preferred display currency</p>
                  </div>
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as Currency)}
                    className="bg-white/10 border border-white/20 rounded-lg text-sm text-white px-3 py-1.5 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all cursor-pointer"
                  >
                    {SUPPORTED_CURRENCIES.map((curr) => (
                      <option key={curr} value={curr}>
                        {curr === 'INR' ? 'INR (₹)' : 'USD ($)'}
                      </option>
                    ))}
                  </select>
               </div>
               <div className="p-4 flex items-center justify-between gap-4 group hover:bg-white/5 transition-all">
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">Theme</p>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Choose how the app looks</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}
                      className="bg-white/10 border border-white/20 rounded-lg text-sm text-white px-3 py-1.5 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all cursor-pointer"
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                    </select>
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="px-3 py-1.5 rounded-lg text-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                      Toggle
                    </button>
                  </div>
               </div>
            </div>
          </section>

          {/* Data Management */}
          <DataExportImport />

          {/* Connected Accounts */}
          <section className="glass-panel rounded-2xl overflow-hidden hover-lift">
            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Wallet size={18} className="text-purple-400" />
                Linked Accounts
              </h4>
              <button className="text-xs bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 hover:text-white px-3 py-1.5 rounded-lg transition-all font-medium border border-cyan-500/30 hover:scale-105">
                + Link New
              </button>
            </div>
            <div className="p-4 space-y-3">
               {[
                 { name: 'Chase Checking', mask: '**** 4029', status: 'Active' },
                 { name: 'Amex Gold', mask: '**** 1002', status: 'Syncing' }
               ].map((acc, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 group hover:border-cyan-400/50 hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                          <CreditCard size={20} className="text-black" />
                       </div>
                       <div>
                          <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">{acc.name}</p>
                          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{acc.mask} • <span className={acc.status === 'Active' ? 'text-green-400' : 'text-yellow-400'}>{acc.status}</span></p>
                       </div>
                    </div>
                    <button className="text-gray-500 hover:text-red-400 p-2 transition-all hover:scale-110">
                      <Trash2 size={16} />
                    </button>
                 </div>
               ))}
            </div>
          </section>

          {/* Notifications */}
          <section className="glass-panel rounded-2xl overflow-hidden hover-lift">
             <div className="p-4 border-b border-white/10 bg-white/5">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Bell size={18} className="text-yellow-400" />
                Notifications
              </h4>
            </div>
            <div className="p-4 space-y-4">
              {[
                { key: 'budgetAlerts', label: 'Budget Alerts' },
                { key: 'weeklyReports', label: 'Weekly Reports' },
                { key: 'unusualSpending', label: 'Unusual Spending Detected' },
                { key: 'marketingEmails', label: 'Marketing Emails' }
              ].map((setting, i) => {
                const isEnabled = notifications[setting.key as keyof typeof notifications];
                return (
                  <div key={i} className="flex items-center justify-between group hover:bg-white/5 p-2 rounded-lg transition-all">
                     <span className="text-sm text-gray-200 group-hover:text-white transition-colors">{setting.label}</span>
                     <button 
                       onClick={() => toggleNotification(setting.key as keyof typeof notifications)}
                       className={`w-10 h-5 rounded-full relative cursor-pointer transition-all ${isEnabled ? 'bg-cyan-500 hover:bg-cyan-400' : 'bg-gray-600 hover:bg-gray-500'}`}
                     >
                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all shadow-md ${isEnabled ? 'left-6' : 'left-1'}`}></div>
                     </button>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
