import amqp from "amqplib";

async function receive() {

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

    const queue = await channel.assertQueue(
        "",
        {
            exclusive: true
        }
    );

    await channel.bindQueue(
        queue.queue,
        exchange,
        ""
    );

    console.log("Consumer 2 waiting...");

    channel.consume(
        queue.queue,
        (msg) => {

            if (!msg) return;

            console.log(
                "Consumer 2:",
                msg.content.toString()
            );

            channel.ack(msg);

        }
    );

}

receive();