import { DummyEvent } from "./types";
import { HandlerResult } from "../types";

export const handler = async (event: DummyEvent): HandlerResult => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `This is a dummy event, ${event.dummy}`,
    })
  };
};
