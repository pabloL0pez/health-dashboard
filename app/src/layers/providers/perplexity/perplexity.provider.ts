import { AIProvider, AIProviderModel, AIProviderType, AIRequestBody, AIRequestResponse, AIResponse, AIResponseFormatType } from "../types";
import { PerplexityAIRequestBody, PerplexityModelType } from "./types";

export class PerplexityProvider implements AIProvider {
  private readonly url: string | undefined;
  private readonly headers: Record<string, string> = {};
  private readonly aiProviderModel: AIProviderModel = {
    provider: AIProviderType.Perplexity,
    model: this.model,
  }

  constructor(private readonly model: PerplexityModelType = 'sonar') {
    this.url = process.env.PERPLEXITY_API_URL;
    this.headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
    }
  }

  async getStructuredResponse<T>(requestBody: AIRequestBody, schema?: any): Promise<AIResponse<T>> {
    if (!this.url) {
      throw new Error('Perplexity API URL is not defined');
    }

    const perplexityBody: PerplexityAIRequestBody = {
      ...requestBody,
      model: this.model,
      return_images: true,
      response_format: schema ? { type: AIResponseFormatType.JsonSchema, json_schema: schema, } : undefined,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(perplexityBody),
      headers: this.headers,
    }

    let response = null;
    
    try {
      const apiResponse = await fetch(this.url, options);

      if (apiResponse.ok) {
        const rawResponse = await apiResponse.json();
        response = this.parseResponse<T>(rawResponse);
      } else {
        throw new Error(`An error occured while fetching Perplexity API. Status: ${apiResponse.status}`);
      }
    } catch (e) {
      console.error('Error: Could not fetch Perplexity API', e);
    }

    return { response, ...this.aiProviderModel };
  }

  protected parseResponse<T>(response: AIRequestResponse): T | null {
    const content = response?.choices[0]?.message?.content;

    if (!content) {
      return null;
    }

    return JSON.parse(content.split('```')[1]?.split('json')[1]);
  }
}