import { OpenAI } from "openai";
import { AIProvider, AIProviderType, AIRequestBody, AIRequestResponse, AIResponse, AIResponseFormatType } from "../types";
import { OpenAIModelType, OpenAIRequestBody } from "./types";
import { ChatCompletionCreateParamsNonStreaming } from "openai/src/resources/index.js";
import { AIProviderModel } from "../../../handlers/types";

export class OpenAIProvider implements AIProvider {
  private readonly openAIClient = new OpenAI();
  private readonly aiProviderModel: AIProviderModel = {
      provider: AIProviderType.OpenAI,
      model: this.model,
  }

  constructor(private readonly model: OpenAIModelType = 'gpt-4o') {}

  public async getStructuredResponse<T>(requestBody: AIRequestBody, schema?: any): Promise<AIResponse<T>> {
    let response = null;

    let openAIBody: OpenAIRequestBody = {
      ...requestBody,
      model: this.model,
    }

    if (schema) {
      openAIBody = {
        ...openAIBody,
        response_format: { type: AIResponseFormatType.JsonSchema, json_schema: schema },
      }
    }

    try {
      const apiResponse = await this.openAIClient.chat.completions.create(openAIBody as ChatCompletionCreateParamsNonStreaming);
      response = this.parseResponse<T>(apiResponse);
    } catch (e) {
      console.error('Error: Could not fetch OpenAI API', e);
    }

    return { response, ...this.aiProviderModel };
  }

  private parseResponse<T>(aiRequestResponse: AIRequestResponse): T | null {
    const content = aiRequestResponse.choices[0].message.content;

    if (!content) {
      return null;
    }

    return JSON.parse(content);
  }
}