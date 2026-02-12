import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from "./App";
import { RouteError } from './components/RouteError';
import { RouteLoader } from './components/RouteLoader';
import { NotFound } from './components/NotFound';

const Dashboard = lazy(() => import('./components/Dashboard').then((m) => ({ default: m.Dashboard })));
const Wallet = lazy(() => import('./components/Wallet').then((m) => ({ default: m.Wallet })));
const Planning = lazy(() => import('./components/Planning').then((m) => ({ default: m.Planning })));
const Settings = lazy(() => import('./components/Settings').then((m) => ({ default: m.Settings })));
const Analytics = lazy(() => import('./components/Analytics').then((m) => ({ default: m.Analytics })));
const RecurringTransactions = lazy(() =>
  import('./components/RecurringTransactions').then((m) => ({ default: m.RecurringTransactions }))
);
const DebtTracker = lazy(() => import('./components/DebtTracker').then((m) => ({ default: m.DebtTracker })));
const InvestmentPortfolio = lazy(() =>
  import('./components/InvestmentPortfolio').then((m) => ({ default: m.InvestmentPortfolio }))
);
const NetWorthTracker = lazy(() => import('./components/NetWorthTracker').then((m) => ({ default: m.NetWorthTracker })));
const BillReminders = lazy(() => import('./components/BillReminders').then((m) => ({ default: m.BillReminders })));
const TaxPlanner = lazy(() => import('./components/TaxPlanner').then((m) => ({ default: m.TaxPlanner })));
const CreditScore = lazy(() => import('./components/CreditScore').then((m) => ({ default: m.CreditScore })));
const EMICalculator = lazy(() => import('./components/EMICalculator').then((m) => ({ default: m.EMICalculator })));

const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType>) => (
  <Suspense fallback={<RouteLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <RouteError />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />
            },
            {
                path: "/dashboard",
                element: withSuspense(Dashboard)
            },
            {
                path: "/wallet",
                element: withSuspense(Wallet)
            },
            {
                path: "/planning",
                element: withSuspense(Planning)
            },
            {
                path: "/analytics",
                element: withSuspense(Analytics)
            },
            {
                path: "/recurring",
                element: withSuspense(RecurringTransactions)
            },
            {
                path: "/debt",
                element: withSuspense(DebtTracker)
            },
            {
                path: "/investments",
                element: withSuspense(InvestmentPortfolio)
            },
            {
                path: "/net-worth",
                element: withSuspense(NetWorthTracker)
            },
            {
                path: "/bills",
                element: withSuspense(BillReminders)
            },
            {
                path: "/tax-planner",
                element: withSuspense(TaxPlanner)
            },
            {
                path: "/credit-score",
                element: withSuspense(CreditScore)
            },
            {
                path: "/emi-calculator",
                element: withSuspense(EMICalculator)
            },
            {
                path: "/settings",
                element: withSuspense(Settings)
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
]);
