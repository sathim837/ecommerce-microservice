import { getChannel } from "../config/rabbitmq";

const EXCHANGE =
  process.env.ORDER_EXCHANGE || "order.exchange";

export const publishOrderCreated = async (
  order: any
) => {
  const channel = getChannel();

  // Ensure exchange exists
  await channel.assertExchange(
    EXCHANGE,
    "fanout",
    {
      durable: true,
    }
  );

  const message = Buffer.from(
    JSON.stringify(order)
  );

  channel.publish(
    EXCHANGE,
    "",
    message,
    {
      persistent: true,
    }
  );

  console.log(
    "📤 OrderCreated Event Published"
  );
};