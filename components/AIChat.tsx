import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bot, Send, X, TrendingUp, PiggyBank, Target, AlertCircle, ChevronDown, Cpu, Trash2 } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { sendMessageToMentor, fetchOllamaModels } from '../services/geminiService';

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

const STORAGE_KEY = 'ai_chat_history';

const INITIAL_MESSAGE: Message = {
    id: '1',
    text: "Hi! I'm your AI Finance Mentor, powered by your local Ollama model. I can help you with budgeting, saving tips, investment advice, and financial planning. How can I assist you today?",
    sender: 'ai',
    timestamp: new Date(),
};

/** Renders a subset of markdown: **bold**, *italic*, bullet lists (- or *) */
function renderMarkdown(text: string): React.ReactNode {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];

    lines.forEach((line, lineIdx) => {
        const isBullet = /^[\-\*•]\s+/.test(line.trimStart());
        const cleanedLine = isBullet ? line.replace(/^[\s\-\*•]+/, '') : line;

        // Parse inline styles: **bold** and *italic*
        const parseInline = (str: string): React.ReactNode[] => {
            const parts: React.ReactNode[] = [];
            let remaining = str;
            let key = 0;

            while (remaining.length > 0) {
                const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
                const italicMatch = remaining.match(/\*(.+?)\*/);

                const boldIdx   = boldMatch   ? remaining.indexOf(boldMatch[0])   : Infinity;
                const italicIdx = italicMatch ? remaining.indexOf(italicMatch[0]) : Infinity;

                if (boldMatch && boldIdx <= italicIdx) {
                    if (boldIdx > 0) parts.push(remaining.slice(0, boldIdx));
                    parts.push(<strong key={key++} className="font-bold text-white">{boldMatch[1]}</strong>);
                    remaining = remaining.slice(boldIdx + boldMatch[0].length);
                } else if (italicMatch && isFinite(italicIdx)) {
                    if (italicIdx > 0) parts.push(remaining.slice(0, italicIdx));
                    parts.push(<em key={key++} className="italic text-gray-200">{italicMatch[1]}</em>);
                    remaining = remaining.slice(italicIdx + italicMatch[0].length);
                } else {
                    parts.push(remaining);
                    remaining = '';
                }
            }
            return parts;
        };

        if (isBullet) {
            elements.push(
                <div key={lineIdx} className="flex items-start gap-2 my-0.5">
                    <span className="mt-[5px] shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{parseInline(cleanedLine)}</span>
                </div>
            );
        } else if (cleanedLine.trim() === '') {
            elements.push(<div key={lineIdx} className="h-2" />);
        } else {
            elements.push(<span key={lineIdx} className="block">{parseInline(cleanedLine)}</span>);
        }
    });

    return <>{elements}</>;
}

export const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose }) => {
    const { transactions, budgets, savingsGoals } = useFinance();

    // Load or initialise chat history from localStorage
    const [messages, setMessages] = useState<Message[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as Array<Omit<Message, 'timestamp'> & { timestamp: string }>;
                return parsed.map(m => ({ ...m, timestamp: new Date(m.timestamp) }));
            }
        } catch { /* ignore */ }
        return [INITIAL_MESSAGE];
    });

    const [inputValue,        setInputValue]        = useState('');
    const [isSending,         setIsSending]         = useState(false);
    const [availableModels,   setAvailableModels]   = useState<string[]>(['llama3.2:latest']);
    const [selectedModel,     setSelectedModel]     = useState('llama3.2:latest');
    const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
    const [loadingModels,     setLoadingModels]     = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const quickActions = [
        { icon: TrendingUp,   text: 'Investment advice',  color: 'from-green-500/20 to-emerald-500/20' },
        { icon: PiggyBank,    text: 'Saving tips',        color: 'from-blue-500/20 to-cyan-500/20'     },
        { icon: Target,       text: 'Budget planning',    color: 'from-purple-500/20 to-pink-500/20'   },
        { icon: AlertCircle,  text: 'Debt management',    color: 'from-orange-500/20 to-red-500/20'    },
    ];

    // Persist messages to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch { /* ignore */ }
    }, [messages]);

    // Fetch available Ollama models when panel opens
    useEffect(() => {
        if (!isOpen) return;
        setLoadingModels(true);
        fetchOllamaModels()
            .then((models) => {
                setAvailableModels(models);
                const preferred = models.find((m) => m.startsWith('llama3.2')) ?? models[0];
                if (preferred) setSelectedModel(preferred);
            })
            .finally(() => setLoadingModels(false));
    }, [isOpen]);

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isSending]);

    const handleSend = async () => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isSending) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: trimmedInput,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsSending(true);

        try {
            const response = await sendMessageToMentor(
                trimmedInput,
                { transactions, budgets, savingsGoals },
                selectedModel
            );
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: response,
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiResponse]);
        } finally {
            setIsSending(false);
        }
    };

    const handleClearChat = useCallback(() => {
        setMessages([{ ...INITIAL_MESSAGE, id: Date.now().toString(), timestamp: new Date() }]);
    }, []);

    const handleQuickAction = (text: string) => {
        setInputValue(text);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-2xl h-[640px] glass-panel-blue border-2 border-white/30 rounded-3xl flex flex-col overflow-hidden animate-slide-up shadow-[0_0_50px_rgba(34,211,238,0.3)]">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-white/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-white/20">
                            <Bot className="text-cyan-300" size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">AI Finance Mentor</h3>
                            <div className="flex items-center gap-1">
                                <Cpu size={10} className="text-cyan-400" />
                                <p className="text-xs text-cyan-400">Powered by local Ollama · {messages.length - 1} messages</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Clear Chat */}
                        <button
                            onClick={handleClearChat}
                            title="Clear chat history"
                            className="p-2 hover:bg-red-500/20 rounded-full transition-colors text-gray-400 hover:text-red-400"
                        >
                            <Trash2 size={16} />
                        </button>

                        {/* Model Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setModelDropdownOpen(prev => !prev)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs text-gray-200 transition-colors"
                                title="Select Ollama model"
                            >
                                <span className="max-w-[120px] truncate">
                                    {loadingModels ? 'Loading…' : selectedModel}
                                </span>
                                <ChevronDown size={12} />
                            </button>
                            {modelDropdownOpen && !loadingModels && (
                                <div className="absolute right-0 mt-1 w-52 bg-gray-900/95 border border-white/20 rounded-xl shadow-xl z-10 backdrop-blur-sm overflow-hidden">
                                    {availableModels.map((model) => (
                                        <button
                                            key={model}
                                            onClick={() => {
                                                setSelectedModel(model);
                                                setModelDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                                                model === selectedModel
                                                    ? 'bg-cyan-500/20 text-cyan-300'
                                                    : 'text-gray-200 hover:bg-white/10'
                                            }`}
                                        >
                                            {model}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="text-gray-300" size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                            style={{ animationDelay: `${index * 0.03}s` }}
                        >
                            <div
                                className={`max-w-[82%] p-4 rounded-2xl ${
                                    message.sender === 'user'
                                        ? 'bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/30 text-white'
                                        : 'bg-white/10 border border-white/20 text-gray-100'
                                }`}
                            >
                                <div className="text-sm leading-relaxed">
                                    {message.sender === 'ai'
                                        ? renderMarkdown(message.text)
                                        : message.text}
                                </div>
                                <p className="text-[10px] text-gray-400 mt-2">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isSending && (
                        <div className="flex justify-start animate-fade-in">
                            <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions (shown only on very first conversation) */}
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
                <div className="p-5 border-t border-white/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
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
                    <p className="text-xs text-gray-400 mt-2">
                        Using <span className="text-cyan-400 font-medium">{selectedModel}</span> · runs locally on your machine
                    </p>
                </div>
            </div>
        </div>
    );
};
