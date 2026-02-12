import React from 'react';
import { RadialScore } from '../RadialScore';

interface StatCardProps {
    score: number;
    title: string;
    description: string;
}

export const StatCard: React.FC<StatCardProps> = ({ score, title, description }) => {
    return (
        <div className="lg:col-span-3 neumorphic-card rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <RadialScore score={score} />
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="text-sm text-gray-400 text-center mt-2">{description}</p>
        </div>
    );
};
