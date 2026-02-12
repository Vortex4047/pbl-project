import React from 'react';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const RouteError: React.FC = () => {
  const error = useRouteError();

  let title = 'Unexpected routing error';
  let description = 'Something went wrong while loading this page.';

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    description = typeof error.data === 'string' ? error.data : description;
  } else if (error instanceof Error) {
    description = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#1e5a8e] via-[#2563a8] to-[#1e5a8e]">
      <div className="max-w-md w-full glass-panel-blue rounded-2xl border border-white/30 p-6 text-center">
        <h1 className="text-white text-2xl font-semibold mb-2">{title}</h1>
        <p className="text-gray-200 text-sm mb-5">{description}</p>
        <Link
          to="/dashboard"
          className="inline-flex px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 transition-colors text-white font-medium"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
};
