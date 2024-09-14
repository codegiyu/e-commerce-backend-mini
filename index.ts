import express, { Express } from 'express';
import cors from 'cors';
import { authRouter, testRouter } from './app/routes/v1';
import { connectDB } from './app/config/db';

const app: Express = express();
const port = 3005;
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
};

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((_, res, next) => {
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/v1/auth', authRouter);
app.use('/v1/test', testRouter);

app.listen(port, () => console.log('Exclusive e-commerce backend started and listening on port ', port));

export default app;
