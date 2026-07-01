import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import orderRoutes from "./routes/order.route";
import { prisma } from "./config/prisma";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({
    success: true,
    service: "Order Service",
  });
});

app.use("/api/v1/orders", orderRoutes);

app.get("/test-db", async (_, res) => {
  try {
    const orders = await prisma.order.findMany();

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

export default app;