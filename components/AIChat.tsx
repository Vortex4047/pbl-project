import React, { useState } from 'react';
import { Bot, Send, X, TrendingUp, PiggyBank, Target, AlertCircle } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { sendMessageToMentor } from '../services/geminiService';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

interface AIChatProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose }) => {
    const { transactions, budgets, savingsGoals } = useFinance();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm your AI Finance Mentor. I can help you with budgeting, saving tips, investment advice, and financial planning. How can I assist you today?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);

    const quickActions = [
        { icon: TrendingUp, text: 'Investment advice', color: 'from-green-500/20 to-emerald-500/20' },
        { icon: PiggyBank, text: 'Saving tips', color: 'from-blue-500/20 to-cyan-500/20' },
        { icon: Target, text: 'Budget planning', color: 'from-purple-500/20 to-pink-500/20' },
        { icon: AlertCircle, text: 'Debt management', color: 'from-orange-500/20 to-red-500/20' }
    ];

    const handleSend = async () => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isSending) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: trimmedInput,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsSending(true);

        try {
            const response = await sendMessageToMentor(trimmedInput, {
                transactions,
                budgets,
                savingsGoals
            });

            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: response || getAIResponse(trimmedInput),
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
        } finally {
            setIsSending(false);
        }
    };

    const getAIResponse = (input: string): string => {
        const lowerInput = input.toLowerCase();
        
        if (lowerInput.includes('invest') || lowerInput.includes('stock')) {
            return "For investing, I recommend starting with a diversified portfolio. Consider index funds for long-term growth, and always invest within your risk tolerance. Would you like specific recommendations based on your financial goals?";
        } else if (lowerInput.includes('save') || lowerInput.includes('saving')) {
            return "Great question! The 50/30/20 rule is a solid starting point: 50% for needs, 30% for wants, and 20% for savings. I can help you set up automatic savings goals. What's your monthly income?";
        } else if (lowerInput.includes('budget')) {
            return "Let's create a budget together! I see you have some transactions. Based on your spending patterns, I can suggest optimal budget allocations for each category. Would you like me to analyze your spending?";
        } else if (lowerInput.includes('debt')) {
            return "For debt management, I recommend the avalanche method: pay off high-interest debt first while making minimum payments on others. I can help you create a debt payoff plan. What debts are you currently managing?";
        } else {
            return "I'm here to help with all your financial questions! You can ask me about budgeting, saving strategies, investment options, debt management, or any other financial topic. What would you like to know more about?";
        }
    };

    const handleQuickAction = (text: string) => {
        setInputValue(text);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-2xl h-[600px] glass-panel-blue border-2 border-white/30 rounded-3xl flex flex-col overflow-hidden animate-slide-up shadow-[0_0_50px_rgba(34,211,238,0.3)]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-white/20">
                            <Bot className="text-cyan-300" size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">AI Finance Mentor</h3>
                            <p className="text-xs text-gray-300">Always here to help</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="text-gray-300" size={20} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div
                                className={`max-w-[80%] p-4 rounded-2xl ${
                                    message.sender === 'user'
                                        ? 'bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/30 text-white'
                                        : 'bg-white/10 border border-white/20 text-gray-100'
                                }`}
                            >
                                <p className="text-sm">{message.text}</p>
                                <p className="text-xs text-gray-400 mt-2">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                {messages.length === 1 && (
                    <div className="px-6 pb-4">
                        <p className="text-xs text-gray-300 mb-3">Quick actions:</p>
                        <div className="grid grid-cols-2 gap-2">
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuickAction(action.text)}
                                    className={`flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br ${action.color} border border-white/20 hover:scale-105 transition-transform text-left`}
                                >
                                    <action.icon size={16} className="text-cyan-300" />
                                    <span className="text-xs text-white">{action.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input */}
                <div className="p-6 border-t border-white/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && void handleSend()}
                            placeholder="Ask me anything about finance..."
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                        />
                        <button
                            onClick={() => void handleSend()}
                            disabled={!inputValue.trim() || isSending}
                            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                        >
                            {isSending ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Send size={20} />
                            )}
                        </button>
                    </div>
                    {isSending && (
                        <p className="text-xs text-gray-300 mt-2">AI is analyzing your finances...</p>
                    )}
                </div>
            </div>
        </div>
    );
};
