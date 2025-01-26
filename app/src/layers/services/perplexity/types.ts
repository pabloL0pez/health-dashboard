export enum LLMType {
  Sonar = 'sonar',
}

export enum FormatType {
  JsonSchema = 'json_schema',
  Regex = 'regex',
}

export enum RoleType {
  Assistant = 'assistant',
  System = 'system',
  User = 'user',
}

export interface PerplexityMessage {
  role: RoleType;
  content: string;
}

export interface JsonSchema {
  schema: Record<string, unknown>;
}

export interface RegexSchema {
  regex: RegExp;
}

export interface PerplexityResponseFormat {
  type: FormatType;
  json_schema?: JsonSchema;
  regex?: RegexSchema;
}

export interface PerplexityRequestBody {
  model: LLMType;
  messages: PerplexityMessage[];
  response_format?: PerplexityResponseFormat;
}

export interface PerplexityChoice {
  index: number;
  finish_reason: string;
  message: PerplexityMessage;
  delta: PerplexityMessage;
}

export interface PerplexityResponse {
  choices: PerplexityChoice[];
}