import { Transaction, Budget, SavingsGoal } from "../types";

interface FinancialContextData {
  transactions: Transaction[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
}

interface OllamaResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
  // Fallback for native Ollama /api/generate format
  response?: string;
}

// Base URL for Ollama — uses OpenAI-compatible endpoint
const OLLAMA_BASE_URL = "http://localhost:11434/v1";

/**
 * Returns the list of locally available Ollama models.
 * Falls back to a default list if the API is unreachable.
 */
export const fetchOllamaModels = async (): Promise<string[]> => {
  try {
    const res = await fetch("http://localhost:11434/api/tags");
    if (!res.ok) return ["llama3.2:latest"];
    const data = (await res.json()) as { models?: Array<{ name: string }> };
    const models = (data.models ?? []).map((m) => m.name).filter(Boolean);
    return models.length > 0 ? models : ["llama3.2:latest"];
  } catch {
    return ["llama3.2:latest"];
  }
};

export const sendMessageToMentor = async (
  userMessage: string,
  data: FinancialContextData,
  model: string = "llama3.2:latest"
): Promise<string> => {
  try {
    // Construct financial context
    const FINANCIAL_CONTEXT = `You are Finance Mentor AI, a helpful, friendly, and savvy financial assistant.
Here is the user's current financial snapshot:

Recent Transactions:
${data.transactions.slice(0, 10).map((t) => `${t.date}: ${t.merchant} ($${Math.abs(t.amount)}) - ${t.category}`).join("\n")}

Active Budgets:
${data.budgets.map((b) => `${b.category}: $${b.spent} spent of $${b.limit} limit`).join("\n")}

Savings Goals:
${data.savingsGoals.map((g) => `${g.name}: Saved $${g.current} of $${g.target}`).join("\n")}

Answer the user's questions based on this data. Be concise, encouraging, and use emojis occasionally. 
If the user asks about something not in the data, give general financial advice but mention you don't have that specific record.`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout for local models

    const response = await fetch(`${OLLAMA_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: FINANCIAL_CONTEXT },
          { role: "user", content: userMessage },
        ],
        stream: false,
      }),
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as OllamaResponse;
      throw new Error(
        `Ollama Error: ${response.status} - ${errorData.error?.message ?? response.statusText}`
      );
    }

    const result = (await response.json()) as OllamaResponse;
    return (
      result.choices?.[0]?.message?.content ??
      "I'm having trouble analyzing that right now."
    );
  } catch (error: unknown) {
    console.error("Ollama API Error:", error);
    const message = error instanceof Error ? error.message : "";

    if (message.includes("aborted") || message.includes("timeout")) {
      return "⏱️ **Request Timeout**\n\nThe local model took too long to respond. Try a smaller model like `llama3.2:latest` or make sure Ollama is running.";
    }

    if (
      message.includes("Failed to fetch") ||
      message.includes("NetworkError") ||
      message.includes("ECONNREFUSED")
    ) {
      return `🔌 **Ollama Not Running**\n\nCould not connect to Ollama at \`${OLLAMA_BASE_URL}\`.\n\nPlease make sure:\n1. Ollama is installed: https://ollama.ai\n2. Run \`ollama serve\` in your terminal\n3. Pull a model: \`ollama pull llama3.2\`\n\nThen refresh and try again! 🚀`;
    }

    return "⚠️ **Something Went Wrong**\n\nUnexpected error while contacting Ollama. Check your terminal for details.";
  }
};
