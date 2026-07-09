import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB  from "./config/database";
import { connectRabbitMQ } from "./config/rabbitmq";
import { consumeOrderCreated } from "./consumers/order.consumer";

const PORT = process.env.PORT || 3003;

const startServer = async () => {
  try {
    await connectDB();

    await connectRabbitMQ();

    await consumeOrderCreated();

    app.listen(PORT, () => {
      console.log(
        `🚀 Product Service running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start Product Service:",
      error
    );

    process.exit(1);
  }
};

startServer();