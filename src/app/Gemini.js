import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!API_KEY) {
}

export async function getResponseForGivenPrompt(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `Please write the beginning of the story that you would expect based on this title in about 50 words.
      Main character: Maho
      Title: ${prompt.title} 
      Subtitle : ${prompt.subtitle} 
      SubChracters: ${prompt.name1} , ${prompt.name2}, ${prompt.name3}
      Category: "${prompt.category}" `
    );

    const response = result.response;
    const text = await response.text();

    return text;
  } catch (error) {
    return "something went wrong.";
  }
}
