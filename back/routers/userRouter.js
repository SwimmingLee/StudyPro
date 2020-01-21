import express from "express"
import routes from "../routes"
import { user, userDetail, changePassword, signup, signin, read_users } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.home, read_users);
userRouter.post(routes.signup, signup);
userRouter.post(routes.signin, signin);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail);
export default userRouter;