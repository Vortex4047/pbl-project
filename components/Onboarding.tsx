import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Wallet, Target, TrendingUp, Bell } from 'lucide-react';

interface OnboardingProps {
    onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [userData, setUserData] = useState({
        monthlyIncome: '',
        savingsGoal: '',
        riskTolerance: 'moderate',
        notifications: true
    });

    const steps = [
        {
            icon: Wallet,
            title: 'Welcome to Finance Mentor AI',
            description: 'Your personal AI-powered financial assistant. Let\'s set up your profile in just a few steps.',
            color: 'from-cyan-500/20 to-blue-500/20'
        },
        {
            icon: Target,
            title: 'What\'s your monthly income?',
            description: 'This helps us create personalized budgets and savings recommendations.',
            color: 'from-blue-500/20 to-purple-500/20',
            field: 'monthlyIncome'
        },
        {
            icon: TrendingUp,
            title: 'Set your savings goal',
            description: 'How much would you like to save each month?',
            color: 'from-purple-500/20 to-pink-500/20',
            field: 'savingsGoal'
        },
        {
            icon: Bell,
            title: 'You\'re all set!',
            description: 'Start tracking your finances, set budgets, and get AI-powered insights.',
            color: 'from-green-500/20 to-emerald-500/20'
        }
    ];

    const currentStep = steps[step];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            onComplete();
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-[#1e5a8e] via-[#2563a8] to-[#1e5a8e]">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="relative w-full max-w-2xl glass-panel-blue border-2 border-white/30 rounded-3xl p-8 md:p-12 animate-scale-in shadow-[0_0_50px_rgba(34,211,238,0.3)]">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {steps.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 flex-1 mx-1 rounded-full transition-all ${
                                    index <= step
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                                        : 'bg-white/20'
                                }`}
                            />
                        ))}
                    </div>
                    <p className="text-xs text-gray-300 text-center">Step {step + 1} of {steps.length}</p>
                </div>

                {/* Content */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${currentStep.color} border border-white/20 mb-6`}>
                        <currentStep.icon size={48} className="text-cyan-300" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">{currentStep.title}</h2>
                    <p className="text-gray-300">{currentStep.description}</p>
                </div>

                {/* Form Fields */}
                {currentStep.field === 'monthlyIncome' && (
                    <div className="mb-8 animate-slide-up">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Income</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                            <input
                                type="number"
                                value={userData.monthlyIncome}
                                onChange={(e) => setUserData({ ...userData, monthlyIncome: e.target.value })}
                                placeholder="5000"
                                className="w-full pl-8 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 text-lg"
                            />
                        </div>
                    </div>
                )}

                {currentStep.field === 'savingsGoal' && (
                    <div className="mb-8 animate-slide-up">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Savings Goal</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                            <input
                                type="number"
                                value={userData.savingsGoal}
                                onChange={(e) => setUserData({ ...userData, savingsGoal: e.target.value })}
                                placeholder="1000"
                                className="w-full pl-8 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 text-lg"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Risk Tolerance</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['conservative', 'moderate', 'aggressive'].map((risk) => (
                                    <button
                                        key={risk}
                                        onClick={() => setUserData({ ...userData, riskTolerance: risk })}
                                        className={`py-3 px-4 rounded-xl border transition-all ${
                                            userData.riskTolerance === risk
                                                ? 'bg-cyan-500/30 border-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                                                : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                                        }`}
                                    >
                                        <span className="text-sm capitalize">{risk}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                    {step > 0 && (
                        <button
                            onClick={handleBack}
                            className="flex-1 py-4 px-6 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                        >
                            <ChevronLeft size={20} />
                            Back
                        </button>
                    )}
                    <button
                        onClick={handleNext}
                        className="flex-1 py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    >
                        {step === steps.length - 1 ? (
                            <>
                                <Check size={20} />
                                Get Started
                            </>
                        ) : (
                            <>
                                Next
                                <ChevronRight size={20} />
                            </>
                        )}
                    </button>
                </div>

                {/* Skip Button */}
                {step < steps.length - 1 && (
                    <button
                        onClick={onComplete}
                        className="w-full mt-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Skip for now
                    </button>
                )}
            </div>
        </div>
    );
};
