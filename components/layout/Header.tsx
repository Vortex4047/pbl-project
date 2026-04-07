import React, { useState, useEffect, useRef } from 'react';
import {
  Bot, LayoutDashboard, Wallet, PieChart, BarChart3,
  TrendingUp, CreditCard, DollarSign, Calculator, FileText,
  Award, ArrowLeftRight, ChevronDown, User, Repeat,
  Menu, X, Activity
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NotificationCenter } from '../NotificationCenter';

interface HeaderProps {
  onOpenChat: () => void;
}

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
}

// Primary tabs — always visible
const PRIMARY_LINKS: NavItem[] = [
  { to: '/dashboard',   icon: LayoutDashboard, label: 'Dashboard'  },
  { to: '/wallet',      icon: Wallet,          label: 'Wallet'     },
  { to: '/analytics',   icon: BarChart3,       label: 'Analytics'  },
  { to: '/planning',    icon: PieChart,        label: 'Planning'   },
];

// "Manage" dropdown group
const MANAGE_LINKS: NavItem[] = [
  { to: '/investments', icon: TrendingUp,    label: 'Investments' },
  { to: '/debt',        icon: CreditCard,    label: 'Debt'        },
  { to: '/bills',       icon: DollarSign,    label: 'Bills'       },
  { to: '/recurring',   icon: Repeat,        label: 'Recurring'   },
  { to: '/net-worth',   icon: Activity,      label: 'Net Worth'   },
];

// "Tools" dropdown group
const TOOLS_LINKS: NavItem[] = [
  { to: '/tax-planner',       icon: FileText,       label: 'Tax Planner'       },
  { to: '/credit-score',      icon: Award,          label: 'Credit Score'      },
  { to: '/emi-calculator',    icon: Calculator,     label: 'EMI Calculator'    },
  { to: '/currency-converter',icon: ArrowLeftRight, label: 'Currency Converter'},
];

const ACTIVE_CLASS  = 'bg-cyan-500/30 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] border-cyan-400/50';
const DEFAULT_CLASS = 'text-gray-300 hover:text-white hover:bg-white/10 border-transparent';

interface DropdownProps {
  label: string;
  icon: React.ElementType;
  items: NavItem[];
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const NavDropdown: React.FC<DropdownProps> = ({ label, icon: Icon, items, isActive, isOpen, onToggle, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-full border transition-all ${isActive ? ACTIVE_CLASS : DEFAULT_CLASS}`}
      >
        <Icon size={15} />
        <span>{label}</span>
        <ChevronDown size={13} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-52 glass-panel-blue border border-white/20 rounded-2xl shadow-2xl z-50 overflow-hidden animate-scale-in">
          {items.map(({ to, icon: ItemIcon, label: itemLabel }, idx) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-all text-sm text-white ${
                idx === 0 ? 'pt-3' : ''
              } ${idx === items.length - 1 ? 'pb-3' : ''}`}
            >
              <ItemIcon size={15} className="text-cyan-400 shrink-0" />
              <span>{itemLabel}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({ onOpenChat }) => {
  const location = useLocation();
  const currentView = location.pathname;
  const [openDropdown, setOpenDropdown] = useState<'manage' | 'tools' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close dropdowns on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [currentView]);

  const isManageActive = MANAGE_LINKS.some(l => l.to === currentView);
  const isToolsActive  = TOOLS_LINKS.some(l => l.to === currentView);

  const toggle = (name: 'manage' | 'tools') =>
    setOpenDropdown(prev => prev === name ? null : name);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5 shrink-0 group">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-white/20 group-hover:scale-105 transition-transform">
            <Bot className="text-cyan-300" size={22} />
          </div>
          <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
            Finance <span className="text-cyan-300">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          {PRIMARY_LINKS.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-full border transition-all ${
                currentView === to ? ACTIVE_CLASS : DEFAULT_CLASS
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}

          <div className="w-px h-5 bg-white/20 mx-1" />

          <NavDropdown
            label="Manage"
            icon={TrendingUp}
            items={MANAGE_LINKS}
            isActive={isManageActive}
            isOpen={openDropdown === 'manage'}
            onToggle={() => toggle('manage')}
            onClose={() => setOpenDropdown(null)}
          />

          <NavDropdown
            label="Tools"
            icon={Calculator}
            items={TOOLS_LINKS}
            isActive={isToolsActive}
            isOpen={openDropdown === 'tools'}
            onToggle={() => toggle('tools')}
            onClose={() => setOpenDropdown(null)}
          />
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          {/* AI Chat button */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border border-cyan-400/30 text-cyan-300 text-sm font-medium transition-all hover:scale-105"
            title="Open AI Mentor"
          >
            <Bot size={16} />
            <span className="hidden lg:inline">AI Chat</span>
          </button>

          <NotificationCenter />

          <Link
            to="/settings"
            className={`w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-600/40 to-blue-600/40 border-2 flex items-center justify-center transition-all ${
              currentView === '/settings'
                ? 'border-cyan-400 ring-2 ring-cyan-400/30'
                : 'border-white/30 hover:border-cyan-300'
            }`}
          >
            <User size={18} className="text-white" />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(p => !p)}
            className="md:hidden p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-gray-900/95 backdrop-blur-xl animate-slide-in-left">
          <div className="px-4 py-3 space-y-1">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold px-2 pb-1">Main</p>
            {PRIMARY_LINKS.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  currentView === to
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                    : 'text-gray-200 hover:bg-white/10'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}

            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold px-2 pt-2 pb-1">Manage</p>
            {MANAGE_LINKS.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  currentView === to
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                    : 'text-gray-200 hover:bg-white/10'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}

            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold px-2 pt-2 pb-1">Tools</p>
            {TOOLS_LINKS.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  currentView === to
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                    : 'text-gray-200 hover:bg-white/10'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}

            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => { onOpenChat(); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-cyan-300 hover:bg-white/10 transition-all"
              >
                <Bot size={18} />
                AI Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
