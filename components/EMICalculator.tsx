import React, { useState } from 'react';
import { Calculator, Home, Car, GraduationCap, Briefcase, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useCurrency } from '../context/CurrencyContext';

type LoanType = 'home' | 'car' | 'personal' | 'education';

export const EMICalculator: React.FC = () => {
  const { currency, formatCurrency, getCurrencySymbol } = useCurrency();
  const [loanType, setLoanType] = useState<LoanType>('home');
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const calculateEMI = () => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    if (monthlyRate === 0) {
      return Math.round(principal / months);
    }
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalAmount = emi * tenure * 12;
  const totalInterest = totalAmount - principal;
  const monthlyRate = rate / 12 / 100;
  const totalMonths = tenure * 12;

  const firstYearSchedule = (() => {
    let balance = principal;
    return Array.from({ length: Math.min(12, totalMonths) }, (_, index) => {
      const interest = monthlyRate === 0 ? 0 : balance * monthlyRate;
      const principalPaid = Math.min(emi - interest, balance);
      const currentEmi = principalPaid + interest;
      balance = Math.max(0, balance - principalPaid);

      return {
        month: index + 1,
        emi: Math.round(currentEmi),
        principalPaid: Math.round(principalPaid),
        interest: Math.round(interest),
        balance: Math.round(balance),
      };
    });
  })();

  const chartData = [
    { name: 'Principal', value: principal, color: '#22d3ee' },
    { name: 'Interest', value: totalInterest, color: '#3b82f6' },
  ];

  const loanTypes = [
    { type: 'home' as LoanType, icon: Home, label: 'Home Loan', defaultPrincipal: 5000000, defaultRate: 8.5, defaultTenure: 20 },
    { type: 'car' as LoanType, icon: Car, label: 'Car Loan', defaultPrincipal: 800000, defaultRate: 9.5, defaultTenure: 5 },
    { type: 'personal' as LoanType, icon: Briefcase, label: 'Personal Loan', defaultPrincipal: 500000, defaultRate: 12, defaultTenure: 3 },
    { type: 'education' as LoanType, icon: GraduationCap, label: 'Education Loan', defaultPrincipal: 1000000, defaultRate: 10, defaultTenure: 10 },
  ];

  const handleLoanTypeChange = (type: LoanType) => {
    const selected = loanTypes.find(lt => lt.type === type);
    if (selected) {
      setLoanType(type);
      setPrincipal(selected.defaultPrincipal);
      setRate(selected.defaultRate);
      setTenure(selected.defaultTenure);
    }
  };

  return (
    <div className="space-y-6 animate-slide-in-left">
      <div>
        <h2 className="text-2xl font-bold text-white">EMI Calculator</h2>
        <p className="text-gray-300 text-sm">Calculate your loan EMI and plan your finances</p>
      </div>

      {/* Loan Type Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loanTypes.map((lt, index) => (
          <button
            key={lt.type}
            onClick={() => handleLoanTypeChange(lt.type)}
            className={`p-4 rounded-xl border-2 transition-all hover:scale-105 animate-scale-in ${
              loanType === lt.type
                ? 'bg-cyan-500/30 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                : 'glass-panel border-white/20 hover:bg-white/20'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <lt.icon className={loanType === lt.type ? 'text-cyan-300' : 'text-gray-300'} size={24} />
            <p className={`text-sm font-semibold mt-2 ${loanType === lt.type ? 'text-white' : 'text-gray-300'}`}>
              {lt.label}
            </p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="glass-panel rounded-2xl p-6 hover-lift">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Calculator className="text-cyan-400" size={20} />
            Loan Details
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-white">Loan Amount</label>
                <span className="text-lg font-bold text-cyan-400">{formatCurrency(principal)}</span>
              </div>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="100000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{currency === 'INR' ? `${getCurrencySymbol()}1L` : `${getCurrencySymbol()}1K`}</span>
                <span>{currency === 'INR' ? `${getCurrencySymbol()}1Cr` : `${getCurrencySymbol()}1M`}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-white">Interest Rate (p.a.)</label>
                <span className="text-lg font-bold text-cyan-400">{rate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>5%</span>
                <span>20%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-white">Loan Tenure</label>
                <span className="text-lg font-bold text-cyan-400">{tenure} years</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1 year</span>
                <span>30 years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl p-6 hover-lift border-l-4 border-l-cyan-500">
            <p className="text-sm text-gray-300 mb-2">Monthly EMI</p>
            <p className="text-4xl font-bold text-white mb-1">{formatCurrency(emi)}</p>
            <p className="text-xs text-gray-400">per month for {tenure} years</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel rounded-2xl p-4 hover-lift">
              <p className="text-xs text-gray-300 mb-2">Principal Amount</p>
              <p className="text-xl font-bold text-white">{formatCurrency(principal)}</p>
            </div>
            <div className="glass-panel rounded-2xl p-4 hover-lift">
              <p className="text-xs text-gray-300 mb-2">Total Interest</p>
              <p className="text-xl font-bold text-orange-400">{formatCurrency(totalInterest)}</p>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-4 hover-lift">
            <p className="text-xs text-gray-300 mb-2">Total Amount Payable</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(totalAmount)}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="glass-panel rounded-2xl p-6 hover-lift">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <PieChartIcon className="text-cyan-400" size={20} />
          Payment Breakdown
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 90, 142, 0.95)',
                  borderColor: 'rgba(34, 211, 238, 0.3)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
                formatter={(value: any) => formatCurrency(Number(value))}
              />
              <Legend
                wrapperStyle={{ color: '#fff' }}
                formatter={(value) => <span style={{ color: '#fff' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Amortization Preview */}
      <div className="glass-panel rounded-2xl p-6 hover-lift">
        <h3 className="text-lg font-bold text-white mb-4">First Year Payment Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-gray-300 text-xs uppercase">
                <th className="p-3">Month</th>
                <th className="p-3 text-right">EMI</th>
                <th className="p-3 text-right">Principal</th>
                <th className="p-3 text-right">Interest</th>
                <th className="p-3 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {firstYearSchedule.map((row) => {
                return (
                  <tr key={row.month} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 text-white">{row.month}</td>
                    <td className="p-3 text-right text-white">{formatCurrency(row.emi)}</td>
                    <td className="p-3 text-right text-cyan-400">{formatCurrency(row.principalPaid)}</td>
                    <td className="p-3 text-right text-orange-400">{formatCurrency(row.interest)}</td>
                    <td className="p-3 text-right text-gray-300">{formatCurrency(row.balance)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
