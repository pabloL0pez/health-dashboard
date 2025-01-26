import { HandlerError } from "./types";

export const buildHandlerError = (event: unknown): string => {
  const error: HandlerError = {
    message: `Invalid event object, received: ${JSON.stringify(event)}`,
  }

  return JSON.stringify(error);
}