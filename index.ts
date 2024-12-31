import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import {
  authRouter,
  categoryRouter,
  couponRouter,
  productRouter,
  testRouter,
  userRouter,
  orderRouter,
} from './app/routes/v1';
import { connectDB } from './app/config/db';
import cookieParser from 'cookie-parser';
import { notFound } from './app/middlewares/notFound';

const app: Express = express();
const port = process.env.PORT || 3005;
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
};

connectDB();

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((_, res, next) => {
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Exclusive e-commerce running...',
    process: process.pid,
  });
});

app.use('/v1/auth', authRouter);
app.use('/v1/test', testRouter);
app.use('/v1/user', userRouter);
app.use('/v1/category', categoryRouter);
app.use('/v1/product', productRouter);
app.use('/v1/coupon', couponRouter);
app.use('/v1/order', orderRouter);

app.use(notFound);

app.listen(port, () =>
  console.log(
    'Exclusive e-commerce backend started and listening on port ',
    port
  )
);

export default app;
