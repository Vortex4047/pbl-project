import React from 'react';

interface RadialScoreProps {
  score: number;
}

export const RadialScore: React.FC<RadialScoreProps> = ({ score }) => {
  // Calculations for SVG circle
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  // Map 0-1000 score roughly to the circle
  const maxScore = 1000; 
  const progress = Math.min(score / maxScore, 1);
  const dashoffset = circumference - progress * circumference;

  return (
    <div className="relative w-48 h-48 mb-4">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="gradientTeal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00b8c2" />
            <stop offset="100%" stopColor="#8B00FF" />
          </linearGradient>
        </defs>
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#27272a"
          strokeWidth="8"
        />
        {/* Progress Circle */}
        <circle
          className="drop-shadow-[0_0_10px_rgba(0,184,194,0.5)] transition-all duration-1000 ease-out"
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="url(#gradientTeal)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Score</span>
        <span className="text-5xl font-bold text-white drop-shadow-md">{score}</span>
        <div className="flex items-center gap-1 mt-1 text-[#0bda50] text-sm font-medium bg-[#0bda50]/10 px-2 py-0.5 rounded-full">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>+12</span>
        </div>
      </div>
    </div>
  );
};