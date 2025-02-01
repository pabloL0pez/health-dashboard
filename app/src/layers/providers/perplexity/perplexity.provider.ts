import { AIProvider, AIProviderModel, AIProviderType, AIRequestBody, AIResponse } from "../types";
import { PerplexityAIRequestBody, PerplexityLLMType } from "./types";
import { parseResponse } from "./utils";

export class PerplexityProvider implements AIProvider {
  private readonly url: string | undefined;
  private readonly headers: Record<string, string> = {};
  private readonly aiProviderModel: AIProviderModel = {
    provider: AIProviderType.Perplexity,
    model: this.model,
  }

  constructor(private readonly model = PerplexityLLMType.Sonar) {
    this.url = process.env.PERPLEXITY_API_URL;
    this.headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
    }
  }

  async getStructuredResponse<T>(requestBody: AIRequestBody): Promise<AIResponse<T>> {
    if (!this.url) {
      throw new Error('Perplexity API URL is not defined');
    }

    const perplexityBody: PerplexityAIRequestBody = {
      ...requestBody,
      model: this.model,
      return_images: true,
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
        response = parseResponse<T>(rawResponse);
      } else {
        throw new Error(`An error occured while fetching Perplexity API. Status: ${apiResponse.status}`);
      }
    } catch (e) {
      console.error('Error: Could not fetch Perplexity API', e);
    }

    return { response, ...this.aiProviderModel };
  }
}