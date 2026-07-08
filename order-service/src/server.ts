import "dotenv/config";
import { connectRabbitMQ } from "./config/rabbitmq";

import app from "./app";

const PORT = process.env.PORT || 3002;

const startServer = async () => {
  try {
    await connectRabbitMQ();

    app.listen(PORT, () => {
      console.log(
        `🚀 Order Service running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error("Failed to start Order Service:", error);
    process.exit(1);
  }
};

startServer();