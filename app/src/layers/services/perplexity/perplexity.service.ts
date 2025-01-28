import { Singleton } from "../../utils/singleton";
import { AIService } from "../types";
import { PerplexityRequestBody } from "./types";
import { parseResponse } from "./utils";

export class PerplexityService extends Singleton<PerplexityService>() implements AIService {
  private readonly url: string | undefined;
  private readonly headers: Record<string, string> = {};

  constructor() {
    super();
    this.url = process.env.PERPLEXITY_API_URL;
    this.headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
    }
  }

  async getStructuredResponse<T>(requestBody: PerplexityRequestBody): Promise<T> {
    if (!this.url) {
      throw new Error('Perplexity API URL is not defined');
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(requestBody),
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