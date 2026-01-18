
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found in environment.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const polishContent = async (text: string): Promise<string> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Please polish the following content for a professional social media creator. Make it more engaging and clear while keeping the original meaning: \n\n${text}`,
  });
  return response.text || "Failed to polish content.";
};

export const generateTitle = async (text: string): Promise<string[]> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this content, suggest 5 catchy and viral-worthy titles for platforms like WeChat, TikTok, or Bilibili. Format as a simple list. Content: \n\n${text}`,
  });
  
  const lines = response.text?.split('\n').filter(line => line.trim().length > 0) || [];
  return lines.map(l => l.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').trim()).slice(0, 5);
};

export const extractOutline = async (text: string): Promise<string[]> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Extract a logical outline from this content. Return only a flat list of headings. Content: \n\n${text}`,
  });
  return response.text?.split('\n').filter(l => l.trim()).slice(0, 8) || [];
};
