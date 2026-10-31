import { AIProvider, AIResponse } from "./provider"

export class GroqProvider implements AIProvider {
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.GROQ_API_KEY || "";
    this.model = process.env.GROQ_MODEL || "llama-3.1-70b-versatile";
  }

  async generateText(prompt: string, systemPrompt: string = "", modelOverride?: string): Promise<AIResponse> {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: modelOverride || this.model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        content: data.choices[0].message.content,
        confidence: 1.0,
        raw: data,
      };
    } catch (error) {
      console.error("GroqProvider Error:", error);
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
