import { OpenAIApi, Configuration } from "openai";

const config = new Configuration({
  apiKey: process.env.GPT_API_KEY,
});

export const openaiClient = new OpenAIApi(config);
