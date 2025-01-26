export enum LLMType {
  Sonar = 'sonar',
}

export enum FormatType {
  JsonSchema = 'json_schema',
  Regex = 'regex',
}

export interface PerplexityMessage {
  role: string;
  content: string | string[];
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
  response_format: PerplexityResponseFormat<T>;
}