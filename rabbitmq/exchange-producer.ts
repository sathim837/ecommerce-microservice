import amqp from "amqplib";

async function sendMessage() {

    const connection = await amqp.connect("amqp://localhost");

    const channel = await connection.createChannel();

    const exchange = "logs_exchange";

    await channel.assertExchange(
        exchange,
        "fanout",
        {
            durable: true
        }
    );

    const message = "Order Created";

    channel.publish(
        exchange,
        "",
        Buffer.from(message)
    );

    console.log("Sent:", message);

    setTimeout(() => {
        connection.close();
    }, 500);

}

sendMessage();