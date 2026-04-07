import React, { useState } from 'react';
import { Receipt, PieChart, Target, DollarSign, TrendingUp, BarChart2 } from 'lucide-react';

const CATEGORY_COLORS: Record<string, string> = {
  Dining:        '#eab308',
  Transport:     '#22c55e',
  Groceries:     '#ef4444',
  Shopping:      '#3b82f6',
  Entertainment: '#a855f7',
  Others:        '#6b7280',
};

/**
 * Opens a printable HTML finance report in a new browser tab.
 * Accepts the same data types from FinanceContext so we can
 * import this utility from the Analytics page.
 */
export function generateReport(
  transactions: { merchant: string; date: string; amount: number; category: string }[],
  budgets: { category: string; spent: number; limit: number }[],
  savingsGoals: { name: string; current: number; target: number }[],
  formatCurrency: (n: number) => string
): void {
  const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  const totalSpent = transactions
    .filter(t => t.amount < 0)
    .reduce((s, t) => s + Math.abs(t.amount), 0);

  const totalIncome = 85000; // estimated; replace with real income if tracked
  const netSavings  = totalIncome - totalSpent;

  // Category breakdown
  const byCategory: Record<string, number> = {};
  for (const t of transactions.filter(t => t.amount < 0)) {
    byCategory[t.category] = (byCategory[t.category] ?? 0) + Math.abs(t.amount);
  }

  const categoryRows = Object.entries(byCategory)
    .sort(([, a], [, b]) => b - a)
    .map(([cat, amount]) => {
      const pct = ((amount / totalSpent) * 100).toFixed(1);
      const color = CATEGORY_COLORS[cat] ?? CATEGORY_COLORS.Others;
      return `<tr>
        <td style="padding:8px 12px;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};margin-right:8px;"></span>${cat}</td>
        <td style="padding:8px 12px;text-align:right;font-weight:600;">${formatCurrency(amount)}</td>
        <td style="padding:8px 12px;text-align:right;color:#9ca3af;">${pct}%</td>
      </tr>`;
    }).join('');

  const transactionRows = transactions.slice(0, 10).map(t =>
    `<tr>
      <td style="padding:8px 12px;">${t.merchant}</td>
      <td style="padding:8px 12px;color:#9ca3af;">${t.date}</td>
      <td style="padding:8px 12px;color:#9ca3af;">${t.category}</td>
      <td style="padding:8px 12px;text-align:right;font-weight:600;color:${t.amount < 0 ? '#ef4444' : '#22c55e'};">
        ${t.amount < 0 ? '-' : '+'}${formatCurrency(Math.abs(t.amount))}
      </td>
    </tr>`
  ).join('');

  const budgetRows = budgets.map(b => {
    const pct = Math.min((b.spent / b.limit) * 100, 100).toFixed(0);
    const color = Number(pct) >= 100 ? '#ef4444' : Number(pct) >= 80 ? '#eab308' : '#22c55e';
    return `<tr>
      <td style="padding:8px 12px;">${b.category}</td>
      <td style="padding:8px 12px;text-align:right;">${formatCurrency(b.spent)}</td>
      <td style="padding:8px 12px;text-align:right;">${formatCurrency(b.limit)}</td>
      <td style="padding:8px 12px;text-align:right;font-weight:700;color:${color};">${pct}%</td>
    </tr>`;
  }).join('');

  const goalRows = savingsGoals.map(g => {
    const pct = Math.min((g.current / g.target) * 100, 100).toFixed(0);
    return `<tr>
      <td style="padding:8px 12px;">${g.name}</td>
      <td style="padding:8px 12px;text-align:right;">${formatCurrency(g.current)}</td>
      <td style="padding:8px 12px;text-align:right;">${formatCurrency(g.target)}</td>
      <td style="padding:8px 12px;text-align:right;font-weight:700;color:#22d3ee;">${pct}%</td>
    </tr>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Finance Report — ${today}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0f172a; color: #e2e8f0; padding: 40px 60px; line-height: 1.6; }
    h1 { font-size: 2rem; font-weight: 800; color: #22d3ee; margin-bottom: 4px; }
    h2 { font-size: 1.1rem; font-weight: 700; color: #fff; margin: 32px 0 16px; border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 8px; }
    .subtitle { color: #6b7280; font-size: 0.9rem; margin-bottom: 32px; }
    .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
    .summary-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px; }
    .summary-card .label { font-size: 0.75rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
    .summary-card .value { font-size: 1.6rem; font-weight: 800; }
    .income { color: #22c55e; }
    .expense { color: #ef4444; }
    .savings { color: #22d3ee; }
    table { width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.04); border-radius: 12px; overflow: hidden; margin-bottom: 8px; }
    thead { background: rgba(255,255,255,0.08); }
    th { padding: 10px 12px; text-align: left; font-size: 0.75rem; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.06em; font-weight: 600; }
    tr:not(:last-child) td { border-bottom: 1px solid rgba(255,255,255,0.06); }
    td { font-size: 0.9rem; }
    .footer { margin-top: 48px; text-align: center; color: #4b5563; font-size: 0.8rem; }
    @media print {
      body { background: #fff; color: #111; padding: 20px; }
      .summary-card { background: #f9fafb; border-color: #e5e7eb; }
      h1, h2 { color: #111; }
      table { background: #f9fafb; }
      thead { background: #e5e7eb; }
    }
  </style>
</head>
<body>
  <h1>Finance Mentor AI</h1>
  <p class="subtitle">Report generated on ${today}</p>

  <h2>Summary</h2>
  <div class="summary-grid">
    <div class="summary-card"><div class="label">Estimated Income</div><div class="value income">${formatCurrency(totalIncome)}</div></div>
    <div class="summary-card"><div class="label">Total Spent</div><div class="value expense">${formatCurrency(totalSpent)}</div></div>
    <div class="summary-card"><div class="label">Net Savings</div><div class="value savings">${formatCurrency(netSavings)}</div></div>
  </div>

  <h2>Spending by Category</h2>
  <table>
    <thead><tr><th>Category</th><th style="text-align:right;">Amount</th><th style="text-align:right;">% of Total</th></tr></thead>
    <tbody>${categoryRows}</tbody>
  </table>

  <h2>Budget Status</h2>
  <table>
    <thead><tr><th>Category</th><th style="text-align:right;">Spent</th><th style="text-align:right;">Limit</th><th style="text-align:right;">Used</th></tr></thead>
    <tbody>${budgetRows}</tbody>
  </table>

  <h2>Recent Transactions</h2>
  <table>
    <thead><tr><th>Merchant</th><th>Date</th><th>Category</th><th style="text-align:right;">Amount</th></tr></thead>
    <tbody>${transactionRows}</tbody>
  </table>

  <h2>Savings Goals</h2>
  <table>
    <thead><tr><th>Goal</th><th style="text-align:right;">Saved</th><th style="text-align:right;">Target</th><th style="text-align:right;">Progress</th></tr></thead>
    <tbody>${goalRows}</tbody>
  </table>

  <div class="footer">
    <p>Finance Mentor AI · Personal Finance Report · ${today}</p>
    <p style="margin-top:4px;">This report is for personal reference only.</p>
  </div>

  <script>window.onload = () => window.print();</script>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  window.open(url, '_blank');
}
