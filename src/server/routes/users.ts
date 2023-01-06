import express from "express";
import UserHandler from "../../handlers/users";
import verifyAuthToken from "../../handlers/middleware/verify-token";

const userRouter = express.Router();
const userHandler = new UserHandler();

userRouter.get("/", verifyAuthToken, userHandler.indexUser);
userRouter.get("/:id", verifyAuthToken, userHandler.showUser);
userRouter.post("/create", userHandler.createUser);
// userRouter.post("/authenticate", userHandler.AuthUser);
userRouter.delete("/:id", verifyAuthToken, userHandler.deleteUser);
userRouter.put("/:id", verifyAuthToken, userHandler.updateUser);

export default userRouter;
