import { ProcessedEventRepository } from "../repositories/processed-event.repository";

export class ProcessedEventService {
  constructor(private processedEventRepository = new ProcessedEventRepository()) {}

    async isProcessed(eventId: string) {
        return await this.processedEventRepository.isProcessed(eventId);
    }

    async markProcessed(eventId: string) {
        return await this.processedEventRepository.markProcessed(eventId);
    }
}