import OpenAI from "openai";
import { config } from "./env.js";

let client = null;

export function getAIClient() {
  if (!config.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  if (!client) {
    client = new OpenAI({ apiKey: config.OPENAI_API_KEY });
  }
  return client;
}
