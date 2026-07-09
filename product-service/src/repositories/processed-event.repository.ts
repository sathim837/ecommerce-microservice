import { ProcessedEvent } from "../models/processed-events.model";

export class ProcessedEventRepository {

  async isProcessed(eventId: string) {

    return await ProcessedEvent.findOne({ eventId });

  }

  async markProcessed(eventId: string) {

    return await ProcessedEvent.create({
      eventId,
    });

  }

}