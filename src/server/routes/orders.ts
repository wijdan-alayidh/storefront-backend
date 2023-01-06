import express from "express";
import OrderHandler from "../../handlers/orders";
import verifyAuthToken from "../../handlers/middleware/verify-token";

const orderRouter = express.Router();
const orderHandler = new OrderHandler();

orderRouter.get("/", verifyAuthToken, orderHandler.indexOrder);
orderRouter.get("/:id", verifyAuthToken, orderHandler.showOrder);
orderRouter.post("/create", verifyAuthToken, orderHandler.createOrder);
orderRouter.delete("/:id", verifyAuthToken, orderHandler.deleteOrder);
orderRouter.put("/:id", orderHandler.updateOrder);

orderRouter.post("/:id/products", verifyAuthToken, orderHandler.addProduct);

export default orderRouter;
