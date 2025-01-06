import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateResponse = async (prompt) => {
  console.log(prompt);
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
