import { GoogleGenAI } from "@google/genai";
import { TRANSACTIONS, BUDGETS, SAVINGS_GOALS } from "../constants";

// Construct a context string to feed to the AI so it "knows" the user's finances
const FINANCIAL_CONTEXT = `
You are Finance Mentor AI, a helpful, friendly, and savvy financial assistant.
Here is the user's current financial snapshot:

Recent Transactions:
${JSON.stringify(TRANSACTIONS.map(t => `${t.date}: ${t.merchant} ($${Math.abs(t.amount)}) - ${t.category}`).join('\n'))}

Active Budgets:
${JSON.stringify(BUDGETS.map(b => `${b.category}: $${b.spent} spent of $${b.limit} limit`).join('\n'))}

Savings Goals:
${JSON.stringify(SAVINGS_GOALS.map(g => `${g.name}: Saved $${g.current} of $${g.target}`).join('\n'))}

Current Financial Score: 785 (Excellent)
Projected End of Month Balance: $4,250

Answer the user's questions based on this data. Be concise, encouraging, and use emojis occasionally. 
If the user asks about something not in the data, give general financial advice but mention you don't have that specific record.
`;

let aiClient: GoogleGenAI | null = null;

export const getAIClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const sendMessageToMentor = async (userMessage: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: FINANCIAL_CONTEXT,
      }
    });
    
    return response.text || "I'm having trouble analyzing that right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently offline or experiencing issues. Please check your connection.";
  }
};