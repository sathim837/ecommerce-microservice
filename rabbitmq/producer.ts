import amqp from 'amqplib';
// import { Buffer } from 'buffer';

async function sendMessages() {
    try {
        // Connect to the RabbitMQ server
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const queue = 'hello';
        // Ensure the queue exists
        await channel.assertQueue(queue);

        const message = "Hello RabbitMQ!";

        channel.sendToQueue(queue, Buffer.from(message));

        console.log(`Sent: ${message}`);

        // Close the channel and connection
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

sendMessages();