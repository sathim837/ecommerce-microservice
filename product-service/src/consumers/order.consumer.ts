import { getChannel } from "../config/rabbitmq";
import { ProductService } from "../services/product.service";
import { ProcessedEventService } from "../services/processed-event.service";

const productService = new ProductService();
const processedEventService = new ProcessedEventService();
const EXCHANGE = process.env.ORDER_EXCHANGE || "order.exchange";
const QUEUE = process.env.PRODUCT_QUEUE || "product.queue";

export const consumeOrderCreated = async () => {
  try {
    const channel = getChannel();
    // create queue if it doesn't exist
    await channel.assertQueue(QUEUE, { durable: true });
    // Bind the queue to the exchange
    await channel.bindQueue(QUEUE, EXCHANGE, "");

    console.log(`${QUEUE} is bound to ${EXCHANGE}.`);

    channel.consume(QUEUE, async (msg) => {
      if (msg) {
        const orderData = JSON.parse(msg.content.toString());
        // console.log("Received order created message:", orderData);

        const processed = await processedEventService.isProcessed(
          orderData.eventId,
        );

        if (processed) {
          console.log(`Duplicate Event: ${orderData.eventId}`);

          channel.ack(msg);

          return;
        }

        for (const item of orderData.items) {
          //   console.log(item.productId);
          //   console.log(item.quantity);
          await productService.updateStockService(
            item.productId,
            item.quantity,
          );
        }
        await processedEventService.markProcessed(orderData.eventId);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Failed to consume order created messages:", error);
    process.exit(1);
  }
};
