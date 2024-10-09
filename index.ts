import express, { Express } from "express";
import cors from "cors";
import {
  authRouter,
  categoryRouter,
  productRouter,
  testRouter,
  userRouter,
} from "./app/routes/v1";
import { connectDB } from "./app/config/db";
import cookieParser from "cookie-parser";

const app: Express = express();
const port = process.env.PORT || 3005;
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
};

connectDB();

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((_, res, next) => {
  res.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/v1/auth", authRouter);
app.use("/v1/test", testRouter);
app.use("/v1/user", userRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/product", productRouter);

app.listen(port, () =>
  console.log(
    "Exclusive e-commerce backend started and listening on port ",
    port
  )
);

export default app;
