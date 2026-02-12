import React, { useState } from 'react';
import { Download, Upload, FileText, Database, CheckCircle } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export const DataExportImport: React.FC = () => {
  const { transactions, budgets, savingsGoals } = useFinance();
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const exportData = (format: 'json' | 'csv') => {
    if (format === 'json') {
      const data = {
        transactions,
        budgets,
        savingsGoals,
        exportDate: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `finance-data-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } else {
      // CSV Export
      const headers = ['Date', 'Merchant', 'Category', 'Amount'];
      const csvContent = [
        headers.join(','),
        ...transactions.map(t => `${t.date},${t.merchant},${t.category},${t.amount}`)
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `transactions-${Date.now()}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        // Validate data structure
        if (data.transactions && data.budgets && data.savingsGoals) {
          localStorage.setItem('transactions', JSON.stringify(data.transactions));
          localStorage.setItem('budgets', JSON.stringify(data.budgets));
          localStorage.setItem('savingsGoals', JSON.stringify(data.savingsGoals));
          setImportStatus('success');
          setTimeout(() => window.location.reload(), 2000);
        } else {
          setImportStatus('error');
        }
      } catch (error) {
        setImportStatus('error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl hover-lift">
      <div className="flex items-center gap-2 mb-6">
        <Database size={24} className="text-cyan-400" />
        <h3 className="text-xl font-bold text-white">Data Management</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Export Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Export Data</h4>
          <button
            onClick={() => exportData('json')}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all hover:scale-105"
          >
            <Download size={18} />
            Export as JSON
          </button>
          <button
            onClick={() => exportData('csv')}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all"
          >
            <FileText size={18} />
            Export as CSV
          </button>
        </div>

        {/* Import Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Import Data</h4>
          <label className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all hover:scale-105 cursor-pointer">
            <Upload size={18} />
            Import JSON File
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          
          {importStatus === 'success' && (
            <div className="flex items-center gap-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
              <CheckCircle size={16} />
              Import successful! Reloading...
            </div>
          )}
          
          {importStatus === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              Invalid file format
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-xs text-gray-400 leading-relaxed">
          Export your data to backup or transfer to another device. Import previously exported data to restore your financial information.
        </p>
      </div>
    </div>
  );
};
