export interface AIResponse {
  content: string;
  confidence: number;
  raw: any;
}

export interface AIProvider {
  generateText(prompt: string, systemPrompt?: string, modelOverride?: string): Promise<AIResponse>;
  generateStructuredText<T>(prompt: string, schema: any, systemPrompt?: string, modelOverride?: string): Promise<T>;
}
