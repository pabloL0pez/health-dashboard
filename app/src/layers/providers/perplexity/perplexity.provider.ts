import { AIProvider, AIRequestBody } from "../types";
import { PerplexityAIRequestBody, PerplexityLLMType } from "./types";
import { parseResponse } from "./utils";

export class PerplexityProvider implements AIProvider {
  private readonly url: string | undefined;
  private readonly headers: Record<string, string> = {};

  constructor(private readonly model?: PerplexityLLMType) {
    this.url = process.env.PERPLEXITY_API_URL;
    this.headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
    }
  }

  async getStructuredResponse<T>(requestBody: AIRequestBody): Promise<T> {
    if (!this.url) {
      throw new Error('Perplexity API URL is not defined');
    }

    const perplexityBody: PerplexityAIRequestBody = {
      ...requestBody,
      model: this.model ?? PerplexityLLMType.Sonar,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(perplexityBody),
      headers: this.headers,
    }
    let response = null;
    
    try {
      response = await fetch(this.url, options);

      if (response.ok) {
        const rawResponse = await response.json();
        return parseResponse<T>(rawResponse);
      } else {
        throw new Error(`An error occured while fetching Perplexity API. Status: ${response.status}`);
      }
    } catch (e) {
      console.error('Error: Could not fetch Perplexity API', e);
    }

    return Promise.resolve([] as unknown as T);
  }
}