import express from "express";
import userRouter from "./users";
import productRouter from "./products";
import orderRouter from "./orders";

const routes = express.Router();

// Main Router
routes.get("/", (_req: express.Request, res: express.Response): void => {
  res.send("Welcome to Storefront");
});

// users routes
routes.use("/users", userRouter);
// Products routes
routes.use("/products", productRouter);
// Orders routes
routes.use("/orders", orderRouter);

export default routes;
