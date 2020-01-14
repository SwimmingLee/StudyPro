import express from "express"
import routes from "../routes"
import { user, userDetail, changePassword, login, signin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.changePassword, changePassword);
userRouter.post(routes.login, login);
userRouter.post(routes.signin, signin);
userRouter.get(routes.userDetail, userDetail);
export default userRouter;