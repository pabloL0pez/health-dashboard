import { DummyEvent } from "./types";
import { Handler, HandlerResult } from "../types";

class DummyHandler implements Handler<DummyEvent> {
  async handleEvent(event: DummyEvent): HandlerResult {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `This is a dummy event, ${event.dummy}`,
      })
    };
  }
}

class DummyHandlerProvider {
  static handler: Handler = new DummyHandler();

  static inject(): Handler {
    return this.handler;
  }
}

export const handler = async (event: DummyEvent): HandlerResult => {
  const dummyHandler = DummyHandlerProvider.inject();
  return await dummyHandler.handleEvent(event);
};
