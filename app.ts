import express from "express";
import dataSource from "./db/data-source";
import errorMiddleware from "./middlewares/errorMiddleware";
import authRouter from "./routes/auth.routes";
import productRouter from "./routes/product.routes";
import orderRouter from "./routes/order.routes";
import cartRouter from "./routes/cart.routes";
import userRouter from "./routes/user.routes";
import authMiddleware from "./middlewares/authMiddleware";
import ConsumerService from "./services/consumer.service";

const server = express();
const consumerService = new ConsumerService();

server.use(express.json());

server.use("/auth", authRouter);

server.use("/products", authMiddleware, productRouter);
server.use("/orders", authMiddleware, orderRouter);
server.use("/cart", authMiddleware, cartRouter);
server.use("/users", authMiddleware, userRouter);

server.use(errorMiddleware);

(async () => {
  try {
    await dataSource.initialize();
    console.log("Database connected");

    // Start the consumer service
    await consumerService.start();
  } catch (e) {
    console.log("Error during startup:", e);
  }

  server.listen(3000, () => {
    console.log("server listening to 3000");
  });
})();