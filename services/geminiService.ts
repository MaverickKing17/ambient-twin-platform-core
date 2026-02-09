
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function triageDiagnostic(telemetry: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this HVAC telemetry: "${telemetry}". Determine if it indicates a "Tripped Breaker" or "Dirty Filter". Output as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            issue: { type: Type.STRING, description: 'Tripped Breaker, Dirty Filter, or None' },
            canRemoteResolve: { type: Type.BOOLEAN },
            simpleExplanation: { type: Type.STRING }
          },
          required: ["issue", "canRemoteResolve", "simpleExplanation"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini triage error:", error);
    return null;
  }
}

export async function getTorontoMarketData() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "What is the current average home price and average days on market for the Toronto real estate market as of the most recent data? Provide a very concise summary with the two main numbers and one trend sentence.",
      config: {
        tools: [{googleSearch: {}}],
      },
    });
    
    const text = response.text || "Market data currently unavailable.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks
      .map((chunk: any) => ({
        title: chunk.web?.title || 'Market Source',
        uri: chunk.web?.uri
      }))
      .filter((s: any) => s.uri);

    return { text, sources };
  } catch (error) {
    console.error("Gemini market data error:", error);
    return null;
  }
}

export async function translateToSimpleEnglish(technicalTerm: string) {
  const map: Record<string, string> = {
    "Static Pressure": "System Breathing",
    "Delta-T": "Heating Power",
    "Inducer/Blower": "System Motors",
    "Telemetry": "Live Vital Signs"
  };
  return map[technicalTerm] || technicalTerm;
}
