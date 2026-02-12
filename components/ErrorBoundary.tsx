import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Unhandled UI error:', error, errorInfo);
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#1e5a8e] via-[#2563a8] to-[#1e5a8e]">
          <div className="max-w-md w-full glass-panel-blue rounded-2xl border border-white/30 p-6 text-center">
            <h1 className="text-white text-xl font-semibold mb-2">Something went wrong</h1>
            <p className="text-gray-200 text-sm mb-4">
              The app hit an unexpected error. Reload the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 transition-colors text-white font-medium"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
