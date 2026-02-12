import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full glass-panel rounded-2xl border border-white/20 p-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">404</h1>
        <p className="text-gray-200 mb-5">This page does not exist.</p>
        <Link
          to="/dashboard"
          className="inline-flex px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 transition-colors text-white font-medium"
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  );
};
