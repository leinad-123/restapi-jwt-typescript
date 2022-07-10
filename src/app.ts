import express, { Application } from 'express';
import morgan from 'morgan';
import 'dotenv/config';

const app: Application = express();

import authRoutes from './routes/auth';

// settings
app.set("port", 4000);

// middleware
app.use(morgan("dev"))
app.use(express.json());

// routes
app.use("/api/auth", authRoutes)
app.use('*', (req, res) => {
    res.send('Not found!!!');
});
export default app;