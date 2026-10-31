import { AIProvider, AIResponse } from "./provider"

export class OllamaProvider implements AIProvider {
  private baseUrl: string;
  private model: string;

  constructor() {
    this.baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
    this.model = process.env.OLLAMA_MODEL || "llama3";
  }

  async generateText(prompt: string, systemPrompt: string = "", modelOverride?: string): Promise<AIResponse> {
    try {
      const modelToUse = modelOverride || this.model;
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: modelToUse,
          prompt: prompt,
          system: systemPrompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        content: data.response,
        confidence: 1.0,
        raw: data,
      };
    } catch (error) {
      console.error("OllamaProvider Error:", error);
      throw error;
    }
  }

  async generateStructuredText<T>(prompt: string, systemPrompt: string = "", schema: any, modelOverride?: string): Promise<T> {
    const structuredPrompt = `${prompt}\n\nReturn the response strictly as JSON matching this schema: ${JSON.stringify(schema)}. Do not include markdown formatting or explanations.`;
    const response = await this.generateText(structuredPrompt, systemPrompt, modelOverride);

    try {
      const cleanJson = response.content.replace(/```json|```/g, "").trim();
      return JSON.parse(cleanJson) as T;
    } catch (error) {
      console.error("Failed to parse structured AI response:", error);
      throw new Error("AI response was not valid JSON");
    }
  }
}

export const aiProvider = new OllamaProvider();
