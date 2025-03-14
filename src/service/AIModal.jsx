import { GoogleGenerativeAI } from "@google/generative-ai";

// const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = import.meta.env.VITE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
export const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//MyAPI = 496043905832-ubfeqplgqq7qrf0ha6bpcpkkr4li0te7.apps.googleusercontent.com