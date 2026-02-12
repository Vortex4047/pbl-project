import React, { useRef, useState } from 'react';
import { Search, Filter, Download, ArrowDownUp, Coffee, Car, ShoppingBag, Music, Film, ShoppingCart, Plus, X } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useCurrency } from '../context/CurrencyContext';

type CsvRecord = Record<string, string>;

const parseCsv = (csvText: string): CsvRecord[] => {
  const lines = csvText.replace(/\r/g, '\n').split('\n').filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];

  const parseLine = (line: string): string[] => {
    const cells: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const next = line[i + 1];

      if (char === '"' && inQuotes && next === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cells.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    cells.push(current.trim());
    return cells;
  };

  const headers = parseLine(lines[0]).map((h) => h.toLowerCase().trim());
  return lines.slice(1).map((line) => {
    const values = parseLine(line);
    const row: CsvRecord = {};
    headers.forEach((header, index) => {
      row[header] = (values[index] || '').trim();
    });
    return row;
  });
};

const parseAmount = (value: string): number => {
  const cleaned = value.replace(/,/g, '').replace(/[^\d.-]/g, '');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getField = (record: CsvRecord, candidates: string[]): string => {
  for (const key of candidates) {
    const found = record[key];
    if (found && found.trim()) return found.trim();
  }
  return '';
};

const normalizeDate = (rawDate: string): string => {
  if (!rawDate) return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) {
    return rawDate;
  }
  return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const inferCategory = (merchant: string): string => {
  const text = merchant.toLowerCase();
  if (text.includes('swiggy') || text.includes('zomato') || text.includes('cafe') || text.includes('restaurant')) return 'Dining';
  if (text.includes('uber') || text.includes('ola') || text.includes('metro') || text.includes('fuel')) return 'Transport';
  if (text.includes('amazon') || text.includes('mall') || text.includes('shop')) return 'Shopping';
  if (text.includes('netflix') || text.includes('spotify') || text.includes('prime')) return 'Entertainment';
  if (text.includes('grocery') || text.includes('mart') || text.includes('big bazaar')) return 'Groceries';
  return 'Shopping';
};

export const Wallet: React.FC = () => {
  const { transactions, addTransaction } = useFinance();
  const { formatCurrency } = useCurrency();
  const [filter, setFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [importStatus, setImportStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  // New transaction state
  const [newAmount, setNewAmount] = useState('');
  const [newMerchant, setNewMerchant] = useState('');
  const [newCategory, setNewCategory] = useState('Dining');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'coffee': return <Coffee size={20} />;
      case 'car': return <Car size={20} />;
      case 'shopping-bag': return <ShoppingBag size={20} />;
      case 'music': return <Music size={20} />;
      case 'tv': return <Film size={20} />;
      case 'shopping-cart': return <ShoppingCart size={20} />;
      default: return <ShoppingBag size={20} />;
    }
  };

  // Safe filtering with null checks
  const filtered = (transactions || []).filter(t => {
    if (!t) return false;
    const merchant = (t.merchant || '').toLowerCase();
    const category = (t.category || '').toLowerCase();
    const searchTerm = (filter || '').toLowerCase();
    return merchant.includes(searchTerm) || category.includes(searchTerm);
  });

  const handleExport = () => {
    const headers = ["Date", "Merchant", "Category", "Amount"];
    const csvContent = [
      headers.join(","),
      ...transactions.map(t => `${t.date},${t.merchant},${t.category},${t.amount}`)
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const records = parseCsv(text);
      if (records.length === 0) {
        setImportStatus('No rows found in CSV file.');
        return;
      }

      let imported = 0;
      for (const record of records) {
        const debit = parseAmount(getField(record, ['debit', 'withdrawal amt.', 'withdrawal amount', 'withdrawal']));
        const credit = parseAmount(getField(record, ['credit', 'deposit amt.', 'deposit amount', 'deposit']));
        const directAmount = parseAmount(getField(record, ['amount', 'txn amount', 'transaction amount']));
        const type = getField(record, ['type', 'transaction type', 'dr/cr', 'drcr']).toLowerCase();

        let amount = 0;
        if (debit > 0) {
          amount = -Math.abs(debit);
        } else if (credit > 0) {
          amount = Math.abs(credit);
        } else if (directAmount !== 0) {
          if (type.includes('credit') || type === 'cr') {
            amount = Math.abs(directAmount);
          } else if (type.includes('debit') || type === 'dr') {
            amount = -Math.abs(directAmount);
          } else {
            amount = directAmount;
          }
        }

        if (amount === 0) continue;

        const merchant = getField(record, [
          'merchant',
          'payee',
          'description',
          'remarks',
          'narration',
          'particulars',
          'transaction details'
        ]) || 'Imported transaction';

        const category = getField(record, ['category']) || inferCategory(merchant);
        const date = normalizeDate(getField(record, ['date', 'txn date', 'transaction date', 'value date']));

        addTransaction({
          merchant,
          amount,
          category,
          date,
          icon: 'shopping-bag'
        });
        imported++;
      }

      setImportStatus(imported > 0 ? `Imported ${imported} transactions successfully.` : 'No valid transactions found to import.');
    } catch (error) {
      console.error('Import failed:', error);
      setImportStatus('Failed to import file. Please check CSV format.');
    } finally {
      event.target.value = '';
    }
  };

  const parseTransactionDate = (value: string): Date | null => {
    const now = new Date();
    const lower = value.toLowerCase();
    if (lower.startsWith('today')) return now;
    if (lower.startsWith('yesterday')) return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
    const parsedWithYear = new Date(`${value} ${now.getFullYear()}`);
    if (!Number.isNaN(parsedWithYear.getTime())) return parsedWithYear;
    return null;
  };

  const handleMonthlyReport = () => {
    const now = new Date();
    const currentMonthTransactions = transactions.filter((txn) => {
      const d = parseTransactionDate(txn.date);
      return d && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });

    const dataSet = currentMonthTransactions.length > 0 ? currentMonthTransactions : transactions;
    const totalSpent = dataSet.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const totalIncome = dataSet.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const savings = totalIncome - totalSpent;

    const categoryTotals = dataSet.reduce<Record<string, number>>((acc, t) => {
      const current = acc[t.category] || 0;
      acc[t.category] = current + Math.abs(t.amount);
      return acc;
    }, {});

    const topCategories = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const topMerchants = dataSet
      .filter((t) => t.amount < 0)
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.merchant] = (acc[t.merchant] || 0) + Math.abs(t.amount);
        return acc;
      }, {});

    const topMerchantList = Object.entries(topMerchants)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const monthLabel = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const reportWindow = window.open('', '_blank', 'width=900,height=800');
    if (!reportWindow) return;

    reportWindow.document.write(`
      <html>
      <head>
        <title>Monthly Finance Report - ${monthLabel}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 32px; color: #111827; }
          h1 { margin-bottom: 4px; }
          .muted { color: #6b7280; margin-bottom: 24px; }
          .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; }
          .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 12px; }
          .label { font-size: 12px; color: #6b7280; text-transform: uppercase; }
          .value { font-size: 20px; font-weight: 700; margin-top: 6px; }
          table { width: 100%; border-collapse: collapse; margin-top: 8px; }
          th, td { text-align: left; padding: 8px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
          th { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.04em; }
          .section { margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>Finance Mentor AI - Monthly Report</h1>
        <div class="muted">${monthLabel}</div>
        <div class="cards">
          <div class="card"><div class="label">Total Spent</div><div class="value">${formatCurrency(totalSpent)}</div></div>
          <div class="card"><div class="label">Total Income</div><div class="value">${formatCurrency(totalIncome)}</div></div>
          <div class="card"><div class="label">Net Savings</div><div class="value">${formatCurrency(savings)}</div></div>
        </div>
        <div class="section">
          <h3>Top Categories</h3>
          <table>
            <thead><tr><th>Category</th><th>Amount</th></tr></thead>
            <tbody>
              ${topCategories.map(([category, amount]) => `<tr><td>${category}</td><td>${formatCurrency(amount)}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="section">
          <h3>Top Merchants</h3>
          <table>
            <thead><tr><th>Merchant</th><th>Amount</th></tr></thead>
            <tbody>
              ${topMerchantList.map(([merchant, amount]) => `<tr><td>${merchant}</td><td>${formatCurrency(amount)}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="section">
          <h3>Summary</h3>
          <p>Transactions analyzed: ${dataSet.length}</p>
        </div>
      </body>
      </html>
    `);
    reportWindow.document.close();
    reportWindow.focus();
    reportWindow.print();
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAmount || !newMerchant) return;

    const iconMap: Record<string, string> = {
      'Dining': 'coffee',
      'Groceries': 'shopping-cart',
      'Transport': 'car',
      'Shopping': 'shopping-bag',
      'Entertainment': 'tv'
    };

    addTransaction({
      merchant: newMerchant,
      amount: -parseFloat(newAmount),
      category: newCategory,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      icon: iconMap[newCategory] || 'shopping-bag'
    });

    setNewAmount('');
    setNewMerchant('');
    setNewCategory('Dining');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-slide-in-left relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Wallet & Transactions</h2>
          <p className="text-gray-300 text-sm">Manage your expenses and income.</p>
        </div>
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={handleFileImport}
          />
          <button 
            onClick={handleImportClick}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm font-medium hover:bg-white/20 transition-all hover:scale-105"
          >
            <Download size={16} />
            Import CSV
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-sm font-bold hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all hover:scale-105"
          >
            <Plus size={16} />
            New Transaction
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm font-medium hover:bg-white/20 transition-all hover:scale-105"
          >
            <Download size={16} />
            Export CSV
          </button>
          <button 
            onClick={handleMonthlyReport}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm font-medium hover:bg-white/20 transition-all hover:scale-105"
          >
            <Download size={16} />
            Monthly Report PDF
          </button>
        </div>
      </div>
      {importStatus && (
        <div className="text-sm text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 rounded-xl px-4 py-2">
          {importStatus}
        </div>
      )}

      {/* Controls */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center hover-lift">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-gray-200 hover:text-white hover:border-cyan-400/50 hover:bg-white/20 transition-all">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-gray-200 hover:text-white hover:border-cyan-400/50 hover:bg-white/20 transition-all">
            <ArrowDownUp size={16} />
            Sort
          </button>
        </div>
      </div>

      {/* List */}
      <div className="glass-panel rounded-2xl overflow-hidden hover-lift">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-300 text-xs uppercase tracking-wider bg-white/5">
                <th className="p-4 font-medium">Transaction</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-right">Amount</th>
                <th className="p-4 font-medium text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((t, index) => (
                <tr 
                  key={t.id} 
                  className="group hover:bg-white/10 transition-all cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-white/20 flex items-center justify-center text-white group-hover:border-cyan-400/50 group-hover:bg-cyan-500/30 transition-all group-hover:scale-110">
                        {getIcon(t.icon)}
                      </div>
                      <span className="font-medium text-white group-hover:text-cyan-300 transition-colors">{t.merchant}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-gray-200 border border-white/20 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 group-hover:text-cyan-300 transition-all">
                      {t.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-300 group-hover:text-white transition-colors">{t.date}</td>
                  <td className="p-4 text-right font-medium text-white group-hover:text-cyan-300 transition-colors">
                    {formatCurrency(Math.abs(t.amount))}
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-gray-400 hover:text-cyan-400 transition-all hover:scale-110">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              No transactions found.
            </div>
          )}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="glass-panel-blue border-2 border-white/30 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Add Transaction</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)} 
                className="text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Merchant</label>
                <input 
                  type="text" 
                  value={newMerchant}
                  onChange={(e) => setNewMerchant(e.target.value)}
                  placeholder="e.g. Starbucks"
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-gray-500"
                  autoFocus
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Amount</label>
                <input 
                  type="number" 
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Category</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-white/90 border-none rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                >
                  <option value="Dining">Dining</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Transport">Transport</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all hover:scale-105 mt-2"
              >
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
