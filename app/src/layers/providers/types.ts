/**
 * Base AI provider interface. All AI providers should implement this interface.
 */
export interface AIProvider {
  getStructuredResponse: <T>(requestBody: AIRequestBody, schema?: any) => Promise<AIResponse<T>>;
}

export type AIRoleType = 'system' | 'user' | 'assistant' | 'tool' | 'function';

export enum AIResponseFormatType {
  JsonSchema = 'json_schema',
}

export interface AIMessage {
  role: AIRoleType;
  content: string | null;
}

export interface AIResponseFormat {
  type: AIResponseFormatType;
  json_schema: any;
}

export interface AIRequestBody {
  messages: AIMessage[];
  temperature?: number;
  response_format?: AIResponseFormat;
}

export enum AIProviderType {
  Perplexity = 'perplexity',
  DeepSeek = 'deepseek',
  OpenAI = 'openai',
}

export interface AIProviderModel {
  provider: AIProviderType;
  model: string;
}

export interface AIResponse<T> extends AIProviderModel {
  response: T | null;
}

export interface AIChoice {
  index: number;
  finish_reason: string;
  message: AIMessage;
  delta?: AIMessage;
}

export interface AIRequestResponse {
  choices: AIChoice[];
}