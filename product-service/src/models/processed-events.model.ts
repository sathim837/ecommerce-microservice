import mongoose from "mongoose";

const processedEventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "processed_events",
  }
);

export const ProcessedEvent = mongoose.model(
  "ProcessedEvent",
  processedEventSchema
);