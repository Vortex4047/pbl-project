import React, { useState } from 'react';
import { Bot, Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthProps {
  onLogin: (user: UserType) => void;
  onSignup: (user: UserType) => void;
}

type AuthMode = 'login' | 'signup' | 'forgot';

export const Auth: React.FC<AuthProps> = ({ onLogin, onSignup }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      
      if (mode === 'forgot') {
        setResetSent(true);
        return;
      }

      if (mode === 'login') {
        if (email && password) {
          onLogin({ name: 'Alex Johnson', email }); // Mock user
        } else {
          setError('Please enter both email and password.');
        }
      } else if (mode === 'signup') {
        if (email && password && name) {
          onSignup({ name, email });
        } else {
          setError('All fields are required.');
        }
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#18181b] p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] animate-float-delayed"></div>

      <div className="w-full max-w-md z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_30px_rgba(0,184,194,0.3)] mb-4">
            <Bot size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Finance Mentor AI</h1>
          <p className="text-gray-400 mt-2">Your personal path to financial freedom.</p>
        </div>

        {/* Card */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
          
          {mode === 'forgot' && resetSent ? (
             <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Check your inbox</h3>
                <p className="text-gray-400 mb-6 text-sm">We've sent password reset instructions to <span className="text-white font-medium">{email}</span>.</p>
                <button 
                  onClick={() => { setMode('login'); setResetSent(false); }}
                  className="text-primary hover:text-white font-medium transition-colors text-sm"
                >
                  Back to Sign In
                </button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-center mb-2">
                <h2 className="text-xl font-bold text-white">
                  {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create an account' : 'Reset Password'}
                </h2>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {mode === 'signup' && (
                <div className="relative group">
                  <User className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1e1e21] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-gray-600"
                  />
                </div>
              )}

              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1e1e21] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-gray-600"
                />
              </div>

              {mode !== 'forgot' && (
                <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#1e1e21] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-gray-600"
                  />
                </div>
              )}

              {mode === 'login' && (
                <div className="flex justify-end">
                  <button 
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Get Started' : 'Send Reset Link'}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Toggles */}
          {!resetSent && (
            <div className="mt-8 text-center border-t border-white/5 pt-6">
              {mode === 'login' ? (
                <p className="text-gray-400 text-sm">
                  Don't have an account?{' '}
                  <button onClick={() => setMode('signup')} className="text-primary hover:text-white font-medium transition-colors">Sign up</button>
                </p>
              ) : (
                <p className="text-gray-400 text-sm">
                  Already have an account?{' '}
                  <button onClick={() => setMode('login')} className="text-primary hover:text-white font-medium transition-colors">Log in</button>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};