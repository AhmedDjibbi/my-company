import { AIProvider } from "./provider"
import { OllamaProvider } from "./ollama"
import { HuggingFaceProvider } from "./huggingface"
import { GroqProvider } from "./groq"

const providerType = process.env.AI_PROVIDER || "ollama";

export const aiProvider: AIProvider =
  providerType === "groq"
    ? new GroqProvider()
    : providerType === "huggingface"
    ? new HuggingFaceProvider()
    : new OllamaProvider();

export { OllamaProvider, HuggingFaceProvider, GroqProvider }
