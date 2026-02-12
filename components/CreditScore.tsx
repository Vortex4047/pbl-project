import React from 'react';
import { TrendingUp, CreditCard, Calendar, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export const CreditScore: React.FC = () => {
  const { formatCurrency } = useCurrency();
  const score = 785;
  const maxScore = 900;
  const percentage = (score / maxScore) * 100;

  const factors = [
    { name: 'Payment History', impact: 'Excellent', score: 100, color: 'text-green-400', icon: CheckCircle },
    { name: 'Credit Utilization', impact: 'Good', score: 85, color: 'text-blue-400', icon: CheckCircle },
    { name: 'Credit Age', impact: 'Fair', score: 70, color: 'text-yellow-400', icon: AlertCircle },
    { name: 'Credit Mix', impact: 'Good', score: 80, color: 'text-blue-400', icon: CheckCircle },
    { name: 'Recent Inquiries', impact: 'Excellent', score: 95, color: 'text-green-400', icon: CheckCircle },
  ];

  const accounts = [
    { type: 'Credit Card', bank: 'HDFC Bank', limit: 200000, used: 45000, status: 'Active', onTime: 24 },
    { type: 'Credit Card', bank: 'ICICI Bank', limit: 150000, used: 28000, status: 'Active', onTime: 18 },
    { type: 'Personal Loan', bank: 'Axis Bank', limit: 500000, used: 125000, status: 'Active', onTime: 12 },
    { type: 'Home Loan', bank: 'SBI', limit: 5000000, used: 3200000, status: 'Active', onTime: 36 },
  ];

  const tips = [
    'Keep credit utilization below 30% for optimal score',
    'Pay all bills on time to maintain excellent payment history',
    'Avoid applying for multiple credit cards in short period',
    'Maintain a healthy mix of secured and unsecured credit',
  ];

  return (
    <div className="space-y-6 animate-slide-in-left">
      <div>
        <h2 className="text-2xl font-bold text-white">Credit Score</h2>
        <p className="text-gray-300 text-sm">Monitor and improve your creditworthiness</p>
      </div>

      {/* Score Display */}
      <div className="glass-panel rounded-2xl p-8 hover-lift">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="16"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="url(#scoreGradient)"
                strokeWidth="16"
                fill="none"
                strokeDasharray={`${percentage * 5.03} 503`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-white">{score}</span>
              <span className="text-sm text-gray-300">out of {maxScore}</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-bold border border-green-500/30">
                Excellent
              </div>
              <TrendingUp className="text-green-400" size={20} />
              <span className="text-green-400 text-sm font-semibold">+15 this month</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Great Credit Health!</h3>
            <p className="text-gray-300 mb-4">
              Your credit score is in the excellent range. You're likely to get approved for loans with favorable interest rates.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-gray-400 mb-1">Last Updated</p>
                <p className="text-sm font-semibold text-white">Dec 10, 2024</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-gray-400 mb-1">Credit Age</p>
                <p className="text-sm font-semibold text-white">5 years 3 months</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-gray-400 mb-1">Total Accounts</p>
                <p className="text-sm font-semibold text-white">{accounts.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Factors */}
      <div className="glass-panel rounded-2xl p-6 hover-lift">
        <h3 className="text-lg font-bold text-white mb-4">Score Factors</h3>
        <div className="space-y-4">
          {factors.map((factor, index) => (
            <div
              key={index}
              className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <factor.icon className={factor.color} size={20} />
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {factor.name}
                    </h4>
                    <p className={`text-xs ${factor.color}`}>{factor.impact}</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-white">{factor.score}%</span>
              </div>
              <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-1000"
                  style={{ width: `${factor.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Accounts */}
      <div className="glass-panel rounded-2xl p-6 hover-lift">
        <h3 className="text-lg font-bold text-white mb-4">Credit Accounts</h3>
        <div className="space-y-4">
          {accounts.map((account, index) => {
            const utilization = (account.used / account.limit) * 100;
            return (
              <div
                key={index}
                className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                      <CreditCard size={20} className="text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {account.type}
                      </h4>
                      <p className="text-sm text-gray-400">{account.bank}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold border border-green-500/30">
                      {account.status}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Limit</p>
                    <p className="text-sm font-semibold text-white">{formatCurrency(account.limit)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Used</p>
                    <p className="text-sm font-semibold text-white">{formatCurrency(account.used)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">On-time Payments</p>
                    <p className="text-sm font-semibold text-white">{account.onTime} months</p>
                  </div>
                </div>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      utilization < 30 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                      utilization < 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                      'bg-gradient-to-r from-red-500 to-pink-600'
                    }`}
                    style={{ width: `${utilization}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {utilization.toFixed(1)}% utilization
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="glass-panel rounded-2xl p-6 hover-lift border-l-4 border-l-cyan-500">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="text-cyan-400" size={20} />
          <h3 className="text-lg font-bold text-white">Tips to Improve Your Score</h3>
        </div>
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-gray-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CheckCircle className="text-cyan-400 flex-shrink-0 mt-0.5" size={16} />
              <span className="text-sm">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
