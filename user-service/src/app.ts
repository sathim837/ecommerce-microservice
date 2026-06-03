import express from 'express';
import cors from 'cors';
import helmet from 'helmet';   
import { prisma } from "./utils/prisma";
import userRoutes from "./routes/user.routes";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('User Service is running');
});




app.use("/api/v1", userRoutes);
// app.get(
//   "/users",
//   async (_req, res) => {
//     const users =
//       await prisma.user.findMany();

//     res.json(users);
//   },
// );

export default app;
