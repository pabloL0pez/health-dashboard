import { PerplexityResponse } from "./types";

export const parseResponse = <T>(response: PerplexityResponse): T => {
  return JSON.parse(response?.choices[0]?.message?.content?.split('```')[1]?.split('json')[1])
}