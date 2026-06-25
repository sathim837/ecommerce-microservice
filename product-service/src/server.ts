import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB  from "./config/database";

const PORT = process.env.PORT || 3003;

const startServer = async () => {
  try {
    await connectDB();

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