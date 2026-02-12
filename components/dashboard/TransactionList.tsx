import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Link } from 'react-router-dom';
import { Coffee, Car, ShoppingBag, Music, Film, ShoppingCart, Plane, Laptop, Shirt } from 'lucide-react';

export const TransactionList: React.FC = () => {
    const { transactions } = useFinance();

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'coffee': return <Coffee size={18} />;
            case 'car': return <Car size={18} />;
            case 'shopping-bag': return <ShoppingBag size={18} />;
            case 'music': return <Music size={18} />;
            case 'tv': return <Film size={18} />;
            case 'shopping-cart': return <ShoppingCart size={18} />;
            case 'plane': return <Plane size={18} />;
            case 'laptop': return <Laptop size={18} />;
            case 'shirt': return <Shirt size={18} />;
            default: return <ShoppingBag size={18} />;
        }
    };

    return (
        <div className="glass-panel rounded-2xl flex flex-col h-full max-h-[400px]">
            <div className="p-6 pb-2 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
                <Link to="/wallet" className="text-xs text-primary hover:text-white transition-colors">View All</Link>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {transactions.slice(0, 4).map((t) => (
                    <div key={t.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#1b2728] border border-white/5 flex items-center justify-center text-white group-hover:border-primary/50 transition-colors">
                                {getIcon(t.icon)}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{t.merchant}</p>
                                <p className="text-xs text-gray-500">{t.date}</p>
                            </div>
                        </div>
                        <span className="text-sm font-medium text-white">${Math.abs(t.amount).toFixed(2)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
