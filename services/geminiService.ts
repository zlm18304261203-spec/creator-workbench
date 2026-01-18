
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  // 安全地获取 API_KEY，防止 process 未定义导致应用崩溃
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
  
  if (!apiKey) {
    console.warn("API Key not found. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const polishContent = async (text: string): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return text;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `请使用专业创作风格润色以下中文内容，使其更具吸引力且表达清晰，同时保留核心原意：\n\n${text}`,
    });
    return response.text || text;
  } catch (error) {
    console.error("AI Polish error:", error);
    return text;
  }
};

export const generateTitle = async (text: string): Promise<string[]> => {
  const ai = getAIClient();
  if (!ai) return ["请配置 API KEY 以使用此功能"];
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `根据以下内容，推荐5个吸引人的爆款标题（适用于微信、抖音、B站等平台）。以列表形式返回，不要有前言。内容如下：\n\n${text}`,
    });
    
    const lines = response.text?.split('\n').filter(line => line.trim().length > 0) || [];
    return lines.map(l => l.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').trim()).slice(0, 5);
  } catch (error) {
    console.error("AI Title generation error:", error);
    return ["标题生成失败"];
  }
};

export const extractOutline = async (text: string): Promise<string[]> => {
  const ai = getAIClient();
  if (!ai) return [];
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `提取以下内容的逻辑大纲，仅返回标题列表：\n\n${text}`,
    });
    return response.text?.split('\n').filter(l => l.trim()).slice(0, 8) || [];
  } catch (error) {
    console.error("AI Outline error:", error);
    return [];
  }
};
