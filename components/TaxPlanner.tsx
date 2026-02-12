import React, { useState } from 'react';
import { Calculator, TrendingDown, FileText, Plus, X, IndianRupee } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface TaxSaving {
  id: string;
  section: string;
  description: string;
  invested: number;
  limit: number;
  category: string;
}

export const TaxPlanner: React.FC = () => {
  const { formatCurrency } = useCurrency();
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('old');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [taxSavings, setTaxSavings] = useState<TaxSaving[]>([
    { id: '1', section: '80C', description: 'PPF Investment', invested: 150000, limit: 150000, category: 'Investment' },
    { id: '2', section: '80D', description: 'Health Insurance', invested: 25000, limit: 50000, category: 'Insurance' },
    { id: '3', section: '80CCD(1B)', description: 'NPS', invested: 50000, limit: 50000, category: 'Pension' },
    { id: '4', section: 'HRA', description: 'House Rent', invested: 180000, limit: 240000, category: 'Allowance' },
  ]);

  const calculateTax = () => {
    let taxableIncome = annualIncome;
    const totalDeductions = taxSavings.reduce((sum, s) => sum + s.invested, 0);
    taxableIncome -= totalDeductions;

    let tax = 0;
    if (taxRegime === 'old') {
      if (taxableIncome <= 250000) tax = 0;
      else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
      else if (taxableIncome <= 1000000) tax = 12500 + (taxableIncome - 500000) * 0.2;
      else tax = 112500 + (taxableIncome - 1000000) * 0.3;
    } else {
      if (taxableIncome <= 300000) tax = 0;
      else if (taxableIncome <= 600000) tax = (taxableIncome - 300000) * 0.05;
      else if (taxableIncome <= 900000) tax = 15000 + (taxableIncome - 600000) * 0.1;
      else if (taxableIncome <= 1200000) tax = 45000 + (taxableIncome - 900000) * 0.15;
      else if (taxableIncome <= 1500000) tax = 90000 + (taxableIncome - 1200000) * 0.2;
      else tax = 150000 + (taxableIncome - 1500000) * 0.3;
    }

    const cess = tax * 0.04;
    return Math.round(tax + cess);
  };

  const totalTax = calculateTax();
  const totalSavings = taxSavings.reduce((sum, s) => sum + s.invested, 0);
  const potentialSavings = taxSavings.reduce((sum, s) => sum + (s.limit - s.invested), 0);

  return (
    <div className="space-y-6 animate-slide-in-left">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Tax Planner</h2>
          <p className="text-gray-300 text-sm">Optimize your tax savings for FY 2025-26</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-sm font-bold hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all hover:scale-105"
        >
          <Plus size={16} />
          Add Investment
        </button>
      </div>

      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-6 rounded-2xl hover-lift animate-scale-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
              <IndianRupee size={20} className="text-blue-400" />
            </div>
            <p className="text-sm text-gray-300">Annual Income</p>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(annualIncome)}</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl hover-lift animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-500/20 border border-green-500/30">
              <TrendingDown size={20} className="text-green-400" />
            </div>
            <p className="text-sm text-gray-300">Total Deductions</p>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(totalSavings)}</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl hover-lift animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/30">
              <Calculator size={20} className="text-red-400" />
            </div>
            <p className="text-sm text-gray-300">Tax Liability</p>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(totalTax)}</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl hover-lift animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
              <FileText size={20} className="text-purple-400" />
            </div>
            <p className="text-sm text-gray-300">More Savings</p>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(potentialSavings)}</p>
        </div>
      </div>

      {/* Tax Regime Selector */}
      <div className="glass-panel p-6 rounded-2xl hover-lift">
        <h3 className="text-lg font-bold text-white mb-4">Tax Regime</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTaxRegime('old')}
            className={`p-4 rounded-xl border-2 transition-all ${
              taxRegime === 'old'
                ? 'bg-cyan-500/30 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
          >
            <h4 className="font-bold text-white mb-2">Old Regime</h4>
            <p className="text-xs text-gray-300">With deductions & exemptions</p>
          </button>
          <button
            onClick={() => setTaxRegime('new')}
            className={`p-4 rounded-xl border-2 transition-all ${
              taxRegime === 'new'
                ? 'bg-cyan-500/30 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
          >
            <h4 className="font-bold text-white mb-2">New Regime</h4>
            <p className="text-xs text-gray-300">Lower rates, no deductions</p>
          </button>
        </div>
      </div>

      {/* Tax Saving Investments */}
      <div className="glass-panel rounded-2xl p-6 hover-lift">
        <h3 className="text-lg font-bold text-white mb-4">Tax Saving Investments</h3>
        <div className="space-y-4">
          {taxSavings.map((saving, index) => {
            const percentage = (saving.invested / saving.limit) * 100;
            return (
              <div
                key={saving.id}
                className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-xs font-bold rounded border border-cyan-500/30">
                        {saving.section}
                      </span>
                      <span className="text-xs text-gray-400">{saving.category}</span>
                    </div>
                    <h4 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {saving.description}
                    </h4>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{formatCurrency(saving.invested)}</p>
                    <p className="text-xs text-gray-400">of {formatCurrency(saving.limit)}</p>
                  </div>
                </div>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {percentage >= 100 ? 'Limit reached' : `${formatCurrency(saving.limit - saving.invested)} more to save`}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tax Breakdown */}
      <div className="glass-panel rounded-2xl p-6 hover-lift">
        <h3 className="text-lg font-bold text-white mb-4">Tax Calculation Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
            <span className="text-gray-300">Gross Annual Income</span>
            <span className="font-semibold text-white">{formatCurrency(annualIncome)}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
            <span className="text-gray-300">Total Deductions</span>
            <span className="font-semibold text-green-400">- {formatCurrency(totalSavings)}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border-t-2 border-cyan-500/30">
            <span className="text-gray-300">Taxable Income</span>
            <span className="font-semibold text-white">{formatCurrency(annualIncome - totalSavings)}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg border border-red-500/30">
            <span className="text-white font-semibold">Total Tax Liability</span>
            <span className="font-bold text-xl text-white">{formatCurrency(totalTax)}</span>
          </div>
        </div>
      </div>

      {/* Add Investment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="glass-panel-blue border-2 border-white/30 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Add Tax Saving Investment</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Section</label>
                <select className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                  <option>80C</option>
                  <option>80D</option>
                  <option>80CCD(1B)</option>
                  <option>HRA</option>
                  <option>80E</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Description</label>
                <input
                  type="text"
                  placeholder="e.g. ELSS Mutual Fund"
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Amount Invested</label>
                <input
                  type="number"
                  placeholder="50000"
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all hover:scale-105"
              >
                Add Investment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
