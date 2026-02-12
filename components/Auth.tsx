import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
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
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#1e5a8e] via-[#2563a8] to-[#1e5a8e]">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      
      {/* Floating 3D Shapes */}
      <div className="absolute top-[15%] left-[8%] w-32 h-32 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-br from-cyan-400/40 to-blue-500/40 blur-sm animate-float shadow-[0_20px_60px_rgba(34,211,238,0.3)]"></div>
      <div className="absolute top-[25%] left-[15%] w-24 h-24 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-gradient-to-br from-blue-400/30 to-cyan-500/30 blur-sm animate-float-delayed shadow-[0_15px_50px_rgba(59,130,246,0.2)]"></div>
      <div className="absolute bottom-[20%] left-[10%] w-40 h-40 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] bg-gradient-to-br from-cyan-500/30 to-blue-600/30 blur-sm animate-float shadow-[0_25px_70px_rgba(34,211,238,0.25)]"></div>
      <div className="absolute top-[10%] right-[12%] w-28 h-28 rounded-[70%_30%_50%_50%/60%_60%_40%_40%] bg-gradient-to-br from-blue-400/35 to-cyan-400/35 blur-sm animate-float-delayed shadow-[0_18px_55px_rgba(59,130,246,0.25)]"></div>
      <div className="absolute bottom-[15%] right-[8%] w-36 h-36 rounded-[50%_50%_30%_70%/50%_50%_70%_30%] bg-gradient-to-br from-cyan-400/40 to-blue-500/40 blur-sm animate-float shadow-[0_22px_65px_rgba(34,211,238,0.3)]"></div>
      <div className="absolute top-[5%] right-[25%] w-20 h-20 rounded-[40%_60%_60%_40%/70%_30%_70%_30%] bg-gradient-to-br from-blue-300/25 to-cyan-300/25 blur-sm animate-float-delayed shadow-[0_12px_40px_rgba(147,197,253,0.2)]"></div>
      <div className="absolute bottom-[35%] right-[5%] w-32 h-32 rounded-[60%_40%_40%_60%/50%_60%_40%_50%] bg-gradient-to-br from-cyan-500/35 to-blue-400/35 blur-sm animate-float shadow-[0_20px_60px_rgba(34,211,238,0.28)]"></div>

      <div className="w-full max-w-md z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Card */}
        <div className="glass-panel-blue p-8 rounded-3xl border border-white/20 backdrop-blur-xl shadow-2xl">
          
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20 mb-6">
              <p className="text-white/70 text-sm">MOCK LOGIN</p>
            </div>
          </div>

          {mode === 'forgot' && resetSent ? (
             <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Check your inbox</h3>
                <p className="text-gray-200/80 mb-6 text-sm">We've sent password reset instructions to <span className="text-white font-medium">{email}</span>.</p>
                <button 
                  onClick={() => { setMode('login'); setResetSent(false); }}
                  className="text-cyan-300 hover:text-white font-medium transition-colors text-sm"
                >
                  Back to Sign In
                </button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-left mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {mode === 'login' ? 'Login' : mode === 'signup' ? 'Create an account' : 'Reset Password'}
                </h2>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {mode === 'signup' && (
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/90 border-none rounded-lg py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-gray-500"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  placeholder="user@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/90 border-none rounded-lg py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-gray-500"
                />
              </div>

              {mode !== 'forgot' && (
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/90 border-none rounded-lg py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-gray-500"
                  />
                </div>
              )}

              {mode === 'login' && (
                <div className="flex justify-start -mt-1">
                  <button 
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-sm text-cyan-300 hover:text-white transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#0a2540] hover:bg-[#0d2f52] text-white font-semibold py-3.5 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <span>{mode === 'login' ? 'Sign in' : mode === 'signup' ? 'Get Started' : 'Send Reset Link'}</span>
                )}
              </button>

              {mode === 'login' && (
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 text-white/60 bg-transparent">or continue with</span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button 
                      type="button"
                      className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg py-3 flex items-center justify-center transition-all"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </button>
                    <button 
                      type="button"
                      className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg py-3 flex items-center justify-center transition-all"
                    >
                      <svg className="w-5 h-5" fill="#fff" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </button>
                    <button 
                      type="button"
                      className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg py-3 flex items-center justify-center transition-all"
                    >
                      <svg className="w-5 h-5" fill="#fff" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </form>
          )}

          {/* Footer Toggles */}
          {!resetSent && (
            <div className="mt-6 text-center">
              {mode === 'login' ? (
                <p className="text-white/70 text-sm">
                  Don't have an account?{' '}
                  <button onClick={() => setMode('signup')} className="text-cyan-300 hover:text-white font-medium transition-colors">Register for free</button>
                </p>
              ) : (
                <p className="text-white/70 text-sm">
                  Already have an account?{' '}
                  <button onClick={() => setMode('login')} className="text-cyan-300 hover:text-white font-medium transition-colors">Log in</button>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
