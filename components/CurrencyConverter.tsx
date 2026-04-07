import React, { useState, useCallback } from 'react';
import { ArrowLeftRight, TrendingUp, TrendingDown, RefreshCw, DollarSign, Info } from 'lucide-react';

interface CurrencyInfo {
  code: string;
  name: string;
  flag: string;
  rateToINR: number; // 1 unit of this currency = X INR
  symbol: string;
  trend: 'up' | 'down' | 'stable';
  trendPct: string;
}

const CURRENCIES: CurrencyInfo[] = [
  { code: 'INR', name: 'Indian Rupee',       flag: '🇮🇳', rateToINR: 1,       symbol: '₹', trend: 'stable', trendPct: '0.00%' },
  { code: 'USD', name: 'US Dollar',           flag: '🇺🇸', rateToINR: 83.42,   symbol: '$', trend: 'up',     trendPct: '+0.12%' },
  { code: 'EUR', name: 'Euro',                flag: '🇪🇺', rateToINR: 90.15,   symbol: '€', trend: 'up',     trendPct: '+0.08%' },
  { code: 'GBP', name: 'British Pound',       flag: '🇬🇧', rateToINR: 105.72,  symbol: '£', trend: 'down',   trendPct: '-0.05%' },
  { code: 'JPY', name: 'Japanese Yen',        flag: '🇯🇵', rateToINR: 0.5621,  symbol: '¥', trend: 'down',   trendPct: '-0.22%' },
  { code: 'AED', name: 'UAE Dirham',          flag: '🇦🇪', rateToINR: 22.71,   symbol: 'د.إ', trend: 'stable', trendPct: '+0.01%' },
  { code: 'SGD', name: 'Singapore Dollar',    flag: '🇸🇬', rateToINR: 61.88,   symbol: 'S$', trend: 'up',    trendPct: '+0.09%' },
  { code: 'CAD', name: 'Canadian Dollar',     flag: '🇨🇦', rateToINR: 61.20,   symbol: 'C$', trend: 'down',  trendPct: '-0.14%' },
  { code: 'AUD', name: 'Australian Dollar',   flag: '🇦🇺', rateToINR: 54.30,   symbol: 'A$', trend: 'up',    trendPct: '+0.07%' },
  { code: 'CHF', name: 'Swiss Franc',         flag: '🇨🇭', rateToINR: 93.80,   symbol: 'Fr', trend: 'up',    trendPct: '+0.03%' },
];

export const CurrencyConverter: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('INR');
  const [toCurrency, setToCurrency]     = useState<string>('USD');
  const [amount, setAmount]             = useState<string>('10000');
  const [isAnimating, setIsAnimating]   = useState(false);

  const getCurrencyInfo = (code: string) => CURRENCIES.find(c => c.code === code)!;

  const convert = useCallback((val: string, from: string, to: string): string => {
    const num = parseFloat(val);
    if (isNaN(num)) return '0.00';
    const fromInfo = getCurrencyInfo(from);
    const toInfo   = getCurrencyInfo(to);
    const inINR    = num * fromInfo.rateToINR;
    const result   = inINR / toInfo.rateToINR;
    return result.toLocaleString('en-IN', { maximumFractionDigits: 4 });
  }, []);

  const handleSwap = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      setIsAnimating(false);
    }, 300);
  };

  const convertedAmount = convert(amount, fromCurrency, toCurrency);
  const fromInfo  = getCurrencyInfo(fromCurrency);
  const toInfo    = getCurrencyInfo(toCurrency);

  // Rate: 1 fromCurrency = ? toCurrency
  const rate = parseFloat(convert('1', fromCurrency, toCurrency));

  // Popular pairs for quick convert
  const POPULAR_PAIRS = [
    { from: 'INR', to: 'USD', label: 'INR → USD' },
    { from: 'INR', to: 'EUR', label: 'INR → EUR' },
    { from: 'INR', to: 'GBP', label: 'INR → GBP' },
    { from: 'INR', to: 'AED', label: 'INR → AED' },
    { from: 'USD', to: 'INR', label: 'USD → INR' },
    { from: 'EUR', to: 'INR', label: 'EUR → INR' },
  ];

  return (
    <div className="space-y-6 animate-slide-in-left">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <DollarSign size={28} className="text-cyan-400" />
          Currency Converter
        </h2>
        <p className="text-gray-300 text-sm mt-1">Convert between global currencies with live indicative rates</p>
      </div>

      {/* Main Converter Card */}
      <div className="glass-panel rounded-2xl p-8 hover-lift">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
          {/* From */}
          <div className="space-y-3">
            <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold">From</label>
            <select
              value={fromCurrency}
              onChange={e => setFromCurrency(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 appearance-none cursor-pointer text-sm"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code} className="bg-gray-900">
                  {c.flag} {c.code} — {c.name}
                </option>
              ))}
            </select>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-bold">{fromInfo.symbol}</span>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400/50 placeholder-gray-600"
                placeholder="0"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="font-medium text-white">{fromInfo.flag} {fromInfo.code}</span>
              <span className="mx-1">·</span>
              <span
                className={fromInfo.trend === 'up' ? 'text-green-400' : fromInfo.trend === 'down' ? 'text-red-400' : 'text-gray-400'}
              >
                {fromInfo.trend === 'up' ? '↑' : fromInfo.trend === 'down' ? '↓' : '→'} {fromInfo.trendPct} today
              </span>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwap}
              className={`p-4 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/40 hover:from-cyan-500/50 hover:to-blue-600/50 transition-all hover:scale-110 shadow-[0_0_20px_rgba(34,211,238,0.2)] ${isAnimating ? 'rotate-180' : ''} duration-300`}
            >
              <ArrowLeftRight size={22} className="text-cyan-300" />
            </button>
          </div>

          {/* To */}
          <div className="space-y-3">
            <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold">To</label>
            <select
              value={toCurrency}
              onChange={e => setToCurrency(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 appearance-none cursor-pointer text-sm"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code} className="bg-gray-900">
                  {c.flag} {c.code} — {c.name}
                </option>
              ))}
            </select>
            <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-400/30 rounded-xl px-4 py-4">
              <span className="block text-xs text-gray-400 mb-1">{toInfo.flag} {toInfo.code} · {toInfo.name}</span>
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                {toInfo.symbol} {convertedAmount}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="font-medium text-white">{toInfo.flag} {toInfo.code}</span>
              <span className="mx-1">·</span>
              <span
                className={toInfo.trend === 'up' ? 'text-green-400' : toInfo.trend === 'down' ? 'text-red-400' : 'text-gray-400'}
              >
                {toInfo.trend === 'up' ? '↑' : toInfo.trend === 'down' ? '↓' : '→'} {toInfo.trendPct} today
              </span>
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <RefreshCw size={14} className="text-cyan-400" />
            <span>1 <span className="text-white font-semibold">{fromInfo.code}</span> = <span className="text-cyan-300 font-bold">{toInfo.symbol}{rate.toLocaleString('en-IN', { maximumFractionDigits: 4 })}</span> {toInfo.code}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Info size={12} />
            <span>Indicative rates · For reference only</span>
          </div>
        </div>
      </div>

      {/* Quick Convert Pairs */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Quick Convert</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {POPULAR_PAIRS.map(({ from, to, label }) => {
            const r = parseFloat(convert('1', from, to));
            const fInfo = getCurrencyInfo(from);
            const tInfo = getCurrencyInfo(to);
            return (
              <button
                key={label}
                onClick={() => { setFromCurrency(from); setToCurrency(to); setAmount('1000'); }}
                className="glass-panel rounded-xl p-4 text-left hover:border-cyan-400/50 border border-white/10 hover:scale-105 transition-all group"
              >
                <p className="text-xs text-gray-400 mb-1">{label}</p>
                <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {fInfo.symbol}1 = {tInfo.symbol}{r.toFixed(r < 1 ? 4 : 2)}
                </p>
                <span className={`text-[10px] mt-1 block ${tInfo.trend === 'up' ? 'text-green-400' : tInfo.trend === 'down' ? 'text-red-400' : 'text-gray-500'}`}>
                  {tInfo.trendPct}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* All Currencies vs INR */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-cyan-400" />
          All Rates vs INR
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CURRENCIES.filter(c => c.code !== 'INR').map((c) => (
            <div
              key={c.code}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:bg-white/10 transition-all cursor-pointer group"
              onClick={() => { setFromCurrency('INR'); setToCurrency(c.code); }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{c.flag}</span>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{c.code}</p>
                  <p className="text-xs text-gray-400">{c.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">₹{c.rateToINR.toLocaleString('en-IN', { maximumFractionDigits: 4 })}</p>
                <p className={`text-xs flex items-center gap-1 justify-end ${c.trend === 'up' ? 'text-green-400' : c.trend === 'down' ? 'text-red-400' : 'text-gray-500'}`}>
                  {c.trend === 'up' ? <TrendingUp size={10} /> : c.trend === 'down' ? <TrendingDown size={10} /> : null}
                  {c.trendPct}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
