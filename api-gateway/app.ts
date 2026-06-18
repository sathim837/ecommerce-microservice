import express from "express";
const cors: any = require("cors");
import helmet from "helmet";
import morgan from "morgan";

import gatewayRoutes from "./routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api", gatewayRoutes);

export default app;