import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import productRoutes from "./routes/product.routes";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Product Service is running');
});

app.use("/api/v1", productRoutes);




export default app;
