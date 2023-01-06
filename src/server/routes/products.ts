import express from "express";
import ProductHandler from "../../handlers/products";
import verifyAuthToken from "../../handlers/middleware/verify-token";

const productRouter = express.Router();
const productHandler = new ProductHandler();

productRouter.get("/", productHandler.indexProduct);
productRouter.get("/:id", productHandler.showProduct);
productRouter.post("/create", verifyAuthToken, productHandler.createProduct);
productRouter.delete("/:id", verifyAuthToken, productHandler.deleteProduct);
productRouter.put("/:id", verifyAuthToken, productHandler.updateProduct);

export default productRouter;
