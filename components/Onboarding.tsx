import React, { useState } from 'react';
import { Bot, ChevronRight, ShieldCheck, Wallet, Sparkles, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const STEPS = [
  {
    title: "Welcome to Finance Mentor",
    desc: "Experience the future of personal finance management. AI-driven insights, secure tracking, and beautiful analytics.",
    icon: <Sparkles size={48} className="text-primary" />
  },
  {
    title: "Meet Your AI Assistant",
    desc: "Your personal financial data scientist. Ask questions, detect anomalies, and get personalized budget advice instantly.",
    icon: <Bot size={48} className="text-secondary" />
  },
  {
    title: "Connect Your Accounts",
    desc: "Securely link your bank accounts to get real-time tracking. We use bank-level encryption to keep your data safe.",
    icon: <ShieldCheck size={48} className="text-green-500" />
  }
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Final step logic
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
        onComplete();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#18181b] flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-4xl p-6 md:p-12 relative z-10 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side: Illustration Area */}
        <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left">
           <div className="mb-8 p-6 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl animate-float">
              {currentStep === 2 ? (
                 <div className="grid grid-cols-2 gap-4 w-64">
                    {['Chase', 'BoA', 'Wells', 'Citi'].map((bank, i) => (
                      <div key={i} className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${i === 0 ? 'bg-primary/20 border-primary/50' : 'bg-[#1e1e21] border-white/5 opacity-50'}`}>
                         <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <Wallet size={16} className="text-white" />
                         </div>
                         <span className="text-xs font-medium text-white">{bank}</span>
                         {i === 0 && <div className="absolute top-2 right-2 text-primary"><Check size={12} /></div>}
                      </div>
                    ))}
                 </div>
              ) : (
                <div className="w-64 h-64 flex items-center justify-center">
                    {STEPS[currentStep].icon}
                </div>
              )}
           </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 space-y-8">
           <div className="space-y-4">
              <div className="flex items-center gap-2">
                 {STEPS.map((_, idx) => (
                    <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentStep ? 'w-8 bg-primary' : 'w-2 bg-white/20'}`} />
                 ))}
              </div>
              
              <h1 className="text-4xl font-bold text-white leading-tight">
                {STEPS[currentStep].title}
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                {STEPS[currentStep].desc}
              </p>
           </div>

           <div className="flex items-center gap-4 pt-4">
              <button 
                onClick={handleNext}
                disabled={isConnecting}
                className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isConnecting ? 'Setting up...' : currentStep === STEPS.length - 1 ? 'Get Started' : 'Continue'}
                {!isConnecting && <ChevronRight size={20} />}
              </button>
              
              {currentStep < STEPS.length - 1 && (
                <button 
                  onClick={() => onComplete()}
                  className="px-6 py-4 text-gray-500 hover:text-white font-medium transition-colors"
                >
                  Skip
                </button>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};