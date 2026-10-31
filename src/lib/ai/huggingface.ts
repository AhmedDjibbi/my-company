import { AIProvider, AIResponse } from "./provider"

export class HuggingFaceProvider implements AIProvider {
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.HUGGING_FACE_API_TOKEN || "";
    this.model = process.env.HUGGING_FACE_MODEL || "mistralai/Mistral-7B-Instruct-v0.3";
  }

  async generateText(prompt: string, systemPrompt: string = "", modelOverride?: string): Promise<AIResponse> {
    try {
      const modelToUse = modelOverride || this.model;
      const fullPrompt = `<s>[INST] ${systemPrompt}\n\n${prompt} [/INST]`;

      const response = await fetch(`https://api-inference.huggingface.co/models/${modelToUse}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Hugging Face error: ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      const content = Array.isArray(data) ? data[0].generated_text : data.generated_text;
      const cleanContent = content.replace(/<s>\[INST\].*?\[\/INST\]\s*/g, "").trim();

      return {
        content: cleanContent,
        confidence: 1.0,
        raw: data,
      };
    } catch (error) {
      console.error("HuggingFaceProvider Error:", error);
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
      console.error("Failed to parse structured Hugging Face response:", error);
      throw new Error("AI response was not valid JSON");
    }
  }
}
