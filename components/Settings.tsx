import React from 'react';
import { User, Bell, Shield, Wallet, LogOut, ChevronRight, Moon, Globe, CreditCard, Trash2, Plus } from 'lucide-react';
import { User as UserType } from '../types';

interface SettingsProps {
  user: UserType | null;
  onLogout: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ user, onLogout }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Settings & Preferences</h2>
        <p className="text-gray-400 text-sm">Manage your profile and application settings.</p>
      </div>

      {/* Profile Card */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 border-4 border-[#18181b] shadow-xl flex items-center justify-center text-3xl font-bold text-gray-300">
            {user?.name.charAt(0) || 'U'}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-primary text-black rounded-full border-4 border-[#18181b] hover:bg-white transition-colors">
            <Plus size={14} />
          </button>
        </div>
        <div className="flex-1 text-center md:text-left space-y-1">
          <h3 className="text-xl font-bold text-white">{user?.name || 'User'}</h3>
          <p className="text-gray-400">{user?.email || 'email@example.com'}</p>
          <div className="pt-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">Pro Member</span>
          </div>
        </div>
        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-colors">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Sidebar Nav */}
        <div className="md:col-span-4 space-y-2">
          <div className="p-1 rounded-xl bg-white/5 border border-white/5">
             {['General', 'Notifications', 'Security', 'Connected Accounts'].map((item, i) => (
               <button key={i} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${i === 0 ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                 {item}
                 {i === 0 && <ChevronRight size={14} />}
               </button>
             ))}
          </div>
          
          <button 
            onClick={onLogout}
            className="w-full mt-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all flex items-center gap-3 text-sm font-medium"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Preferences */}
          <section className="glass-panel rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-white/5">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Globe size={18} className="text-primary" />
                Preferences
              </h4>
            </div>
            <div className="divide-y divide-white/5">
               <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Currency</p>
                    <p className="text-xs text-gray-500">Select your preferred display currency</p>
                  </div>
                  <select className="bg-[#18181b] border border-white/10 rounded-lg text-sm text-white px-3 py-1.5 focus:outline-none focus:border-primary/50">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>JPY (¥)</option>
                  </select>
               </div>
               <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Theme</p>
                    <p className="text-xs text-gray-500">Customize app appearance</p>
                  </div>
                  <div className="flex items-center bg-[#18181b] rounded-lg p-1 border border-white/10">
                     <button className="p-1.5 rounded bg-white/10 text-white"><Moon size={14} /></button>
                     <button className="p-1.5 rounded text-gray-500 hover:text-white"><Globe size={14} /></button>
                  </div>
               </div>
            </div>
          </section>

          {/* Connected Accounts */}
          <section className="glass-panel rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Wallet size={18} className="text-secondary" />
                Linked Accounts
              </h4>
              <button className="text-xs bg-primary/10 text-primary hover:bg-primary hover:text-black px-3 py-1.5 rounded-lg transition-all font-medium border border-primary/20">
                + Link New
              </button>
            </div>
            <div className="p-4 space-y-3">
               {[
                 { name: 'Chase Checking', mask: '**** 4029', status: 'Active' },
                 { name: 'Amex Gold', mask: '**** 1002', status: 'Syncing' }
               ].map((acc, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#18181b] border border-white/5 group hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                          <CreditCard size={20} className="text-black" />
                       </div>
                       <div>
                          <p className="text-sm font-medium text-white">{acc.name}</p>
                          <p className="text-xs text-gray-500">{acc.mask} • <span className={acc.status === 'Active' ? 'text-green-500' : 'text-yellow-500'}>{acc.status}</span></p>
                       </div>
                    </div>
                    <button className="text-gray-600 hover:text-red-400 p-2 transition-colors">
                      <Trash2 size={16} />
                    </button>
                 </div>
               ))}
            </div>
          </section>

          {/* Notifications */}
          <section className="glass-panel rounded-2xl overflow-hidden">
             <div className="p-4 border-b border-white/5 bg-white/5">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Bell size={18} className="text-yellow-500" />
                Notifications
              </h4>
            </div>
            <div className="p-4 space-y-4">
              {['Budget Alerts', 'Weekly Reports', 'Unusual Spending Detected', 'Marketing Emails'].map((setting, i) => (
                <div key={i} className="flex items-center justify-between">
                   <span className="text-sm text-gray-300">{setting}</span>
                   <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${i < 3 ? 'bg-primary' : 'bg-gray-700'}`}>
                      <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all shadow-md ${i < 3 ? 'left-6' : 'left-1'}`}></div>
                   </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};