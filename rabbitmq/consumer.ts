import amqp from "amqplib";

async function receiveMessage() {
  try {
    const connection = await amqp.connect("amqp://localhost");

    const channel = await connection.createChannel();

    const queue = "hello";

    await channel.assertQueue(queue);

    console.log("Waiting for messages...");

    channel.consume(queue, async (message) => {
      if (message) {
        console.log("Received:", message.content.toString());

        console.log("Processing for 30 seconds...");

        await new Promise((resolve) => setTimeout(resolve, 30000));

        console.log("Sending ACK...");

        channel.ack(message);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

receiveMessage();
