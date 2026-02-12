import { Transaction, Budget, SavingsGoal } from "../types";

interface FinancialContextData {
  transactions: Transaction[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
}

interface OpenRouterResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
}

export const sendMessageToMentor = async (userMessage: string, data: FinancialContextData): Promise<string> => {
  try {
    // Check if API key is configured
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
      return "🔑 **API Key Required**\n\nTo use the AI Finance Mentor, you need to set up your OpenRouter API key:\n\n1. Get a free API key from: https://openrouter.ai/keys\n2. Open `.env.local` in your project\n3. Replace `your_openrouter_api_key_here` with your actual API key\n4. Restart the dev server\n\nDon't worry - all other features work without an API key! ✨";
    }

    // Construct financial context
    const FINANCIAL_CONTEXT = `You are Finance Mentor AI, a helpful, friendly, and savvy financial assistant.
Here is the user's current financial snapshot:

Recent Transactions:
${data.transactions.slice(0, 10).map(t => `${t.date}: ${t.merchant} ($${Math.abs(t.amount)}) - ${t.category}`).join('\n')}

Active Budgets:
${data.budgets.map(b => `${b.category}: $${b.spent} spent of $${b.limit} limit`).join('\n')}

Savings Goals:
${data.savingsGoals.map(g => `${g.name}: Saved $${g.current} of $${g.target}`).join('\n')}

Answer the user's questions based on this data. Be concise, encouraging, and use emojis occasionally. 
If the user asks about something not in the data, give general financial advice but mention you don't have that specific record.`;

    // Call OpenRouter API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);
    const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': appUrl,
        'X-Title': 'Finance Mentor AI'
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-exp:free', // Free model
        messages: [
          { role: 'system', content: FINANCIAL_CONTEXT },
          { role: 'user', content: userMessage }
        ]
      })
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as OpenRouterResponse;
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const result = (await response.json()) as OpenRouterResponse;
    return result.choices?.[0]?.message?.content || "I'm having trouble analyzing that right now.";
    
  } catch (error: unknown) {
    console.error("OpenRouter API Error:", error);
    const message = error instanceof Error ? error.message : '';
    
    // Check for specific API key errors
    if (message.includes('API key') || message.includes('401') || message.includes('403')) {
      return "🔑 **Invalid API Key**\n\nYour OpenRouter API key appears to be invalid. Please:\n\n1. Get a valid API key from: https://openrouter.ai/keys\n2. Update `.env.local` with your new key\n3. Restart the dev server\n\nAll other app features work fine! 💪";
    }

    if (message.includes('aborted')) {
      return "⏱️ **Request Timeout**\n\nThe AI service took too long to respond. Please try again.";
    }
    
    // Network or other errors
    return "⚠️ **Connection Issue**\n\nI'm having trouble connecting to the AI service. Please check your internet connection and try again.\n\nIn the meantime, you can still use all other app features! 🚀";
  }
};
