import React, { useState } from 'react';
import { Filter, X, Calendar, DollarSign, Tag } from 'lucide-react';

interface FilterOptions {
  dateRange: 'all' | '7d' | '30d' | '90d' | 'custom';
  minAmount: string;
  maxAmount: string;
  categories: string[];
  sortBy: 'date' | 'amount' | 'merchant';
  sortOrder: 'asc' | 'desc';
}

interface AdvancedFiltersProps {
  onApplyFilters: (filters: FilterOptions) => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'all',
    minAmount: '',
    maxAmount: '',
    categories: [],
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const categories = ['Dining', 'Transport', 'Shopping', 'Entertainment', 'Groceries', 'Health', 'Utilities'];

  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      dateRange: 'all',
      minAmount: '',
      maxAmount: '',
      categories: [],
      sortBy: 'date',
      sortOrder: 'desc'
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  const activeFiltersCount = 
    (filters.dateRange !== 'all' ? 1 : 0) +
    (filters.minAmount ? 1 : 0) +
    (filters.maxAmount ? 1 : 0) +
    filters.categories.length;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-gray-200 hover:text-white hover:border-cyan-400/50 hover:bg-white/20 transition-all"
      >
        <Filter size={16} />
        Filters
        {activeFiltersCount > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md glass-panel-blue border-l-2 border-white/30 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="sticky top-0 p-6 border-b border-white/20 bg-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Filter size={24} className="text-cyan-400" />
                  Advanced Filters
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-all"
                >
                  <X size={20} className="text-gray-300" />
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="p-6 space-y-6">
              {/* Date Range */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                  <Calendar size={16} className="text-cyan-400" />
                  Date Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['all', '7d', '30d', '90d'] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setFilters({ ...filters, dateRange: range })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filters.dateRange === range
                          ? 'bg-cyan-500/30 text-white border-2 border-cyan-400'
                          : 'bg-white/10 text-gray-300 border-2 border-transparent hover:bg-white/20'
                      }`}
                    >
                      {range === 'all' ? 'All Time' : range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Range */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                  <DollarSign size={16} className="text-cyan-400" />
                  Amount Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minAmount}
                      onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxAmount}
                      onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                  <Tag size={16} className="text-cyan-400" />
                  Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        filters.categories.includes(category)
                          ? 'bg-cyan-500/30 text-white border-2 border-cyan-400'
                          : 'bg-white/10 text-gray-300 border-2 border-transparent hover:bg-white/20'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="text-sm font-medium text-white mb-3 block">Sort By</label>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                    <option value="merchant">Merchant</option>
                  </select>
                  <select
                    value={filters.sortOrder}
                    onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value as any })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 p-6 border-t border-white/20 bg-white/10 backdrop-blur-md flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] rounded-xl text-white font-bold transition-all"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
