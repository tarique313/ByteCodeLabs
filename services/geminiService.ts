import { GoogleGenAI } from "@google/genai";

// Fixed to use process.env.API_KEY directly and follow SDK rules for initialization and response handling
export const sendMessageToGemini = async (message: string, history: { role: string; content: string }[]) => {
  try {
    // ALWAYS use the provided API key from process.env.API_KEY directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using ai.chats.create for natural conversation management as shown in the docs
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are ByteBot, the AI representative for ByteCode Labs. 
        ByteCode Labs is a premium software company specializing in:
        - Cyber Security: Enterprise protection.
        - Penetration Testing: Ethical hacking and vulnerability assessments.
        - Web Development: High-performance scalable web apps.
        - Mobile App Development: iOS and Android excellence.
        - Email Security: Phishing and ransomware prevention.
        - Mobile Security: Device hardening and secure comms.
        
        Official Domain: bytecodelabsbd.com
        Official Contact Email: info@bytecodelabsbd.com

        Keep your tone professional, tech-savvy, and concise. 
        Encourage users to book a consultation for specific inquiries. 
        If asked about pricing, mention it depends on the project scope and suggests a discovery call.`,
      },
    });

    // sendMessage is the correct method for interacting with a Chat session
    const response = await chat.sendMessage({ message });
    
    // Using the .text property directly (not calling as a method)
    return response.text || "I'm having trouble connecting right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Graceful error handling for a professional user experience
    return "I encountered an error while processing your request. Please try again later.";
  }
};