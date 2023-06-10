import { Router } from "express";
import UserContr from "./controller.js";
import { checkToken } from "../../middleware/check.token.js";

const userRouter: Router = Router();

userRouter.post("/register", UserContr.Register);
userRouter.get("/confirmation/:confirm", UserContr.ConfirmCode);
userRouter.post("/login", UserContr.Login);
userRouter.get("/profile", checkToken, UserContr.GetProfile);
userRouter.put("/profile", checkToken, UserContr.EditProfile);
userRouter.delete("/profile", checkToken, UserContr.DeleteProfile);
export default userRouter;
         