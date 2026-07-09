import amqp, { Connection, Channel } from 'amqplib';

// let connection : Connection;
// let channel : Channel;

let connection: Awaited<ReturnType<typeof amqp.connect>>;
let channel: Awaited<ReturnType<typeof connection.createChannel>>;

export const connectRabbitMQ = async () => {
    try {

        connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672');

        channel = await connection.createChannel();
        console.log("RabbitMQ connected successfully");

        connection.on('close', () => {
            console.error('RabbitMQ connection closed');
            process.exit(1);
        });

        connection.on('error', (err) => {
            console.error('RabbitMQ connection error:', err);
            process.exit(1);
        });

        return channel;

    }catch(error){

        console.error('Failed to connect to RabbitMQ:', error);
        process.exit(1);

    }
}


export const getChannel = () => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized. Call connectRabbitMQ first.');
    }
    return channel;
}