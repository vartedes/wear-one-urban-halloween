
import { GoogleGenAI } from "@google/genai";

// Always use named parameter for apiKey and obtain it exclusively from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStyleAdvice = async (productName: string, description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a high-end urban streetwear stylist. Provide a short, catchy, and trendy styling tip for a product named "${productName}". The product description is: "${description}". Keep it under 40 words and use a spooky/urban tone.`,
    });
    return response.text || "Domina las calles con este estilo único.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Perfecto para combinar con cualquier look urbano.";
  }
};

export const chatWithStylist = async (history: { role: string, parts: { text: string }[] }[], message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: "Eres 'Ghost', el asistente de estilo de Wear One. Tu tono es urbano, misterioso (estilo Halloween), experto en streetwear y muy cool. Responde en español de forma breve y directa.",
      }
    });
    return response.text || "No puedo responder ahora, el vacío me llama.";
  } catch (error) {
    return "Error en la conexión con el más allá urbano.";
  }
};
