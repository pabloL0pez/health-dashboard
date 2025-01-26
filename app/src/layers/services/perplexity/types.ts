import { AIMessage, AIRequestBody } from "../types";

export enum FormatType {
  JsonSchema = 'json_schema',
  Regex = 'regex',
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

export interface PerplexityRequestBody extends AIRequestBody {
  response_format?: PerplexityResponseFormat;
}

export interface PerplexityChoice {
  index: number;
  finish_reason: string;
  message: AIMessage;
  delta: AIMessage;
}

export interface PerplexityResponse {
  choices: PerplexityChoice[];
}