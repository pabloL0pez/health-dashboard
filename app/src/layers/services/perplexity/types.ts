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

export interface JsonSchema<T> {
  schema: T;
}

export interface RegexSchema {
  regex: RegExp;
}

export interface PerplexityResponseFormat<T> {
  type: FormatType;
  json_schema?: JsonSchema<T>;
  regex?: RegexSchema;
}

export interface PerplexityRequestBody<T> {
  model: LLMType;
  messages: PerplexityMessage[];
  response_format?: PerplexityResponseFormat<T>;
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