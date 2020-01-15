import express from "express"
import routes from "../routes"
import { user, userDetail, changePassword, signup, signin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.changePassword, changePassword);
userRouter.post(routes.signup, signup);
userRouter.post(routes.signin, signin);
userRouter.get(routes.userDetail, userDetail);
export default userRouter;