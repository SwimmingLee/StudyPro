import express from "express"
import routes from "../routes"
import {read_comment,create_comment, update_comment,delete_comment} from "../controllers/userController";

const userRouter = express.Router();
userRouter.get(routes.read_comment, read_comment);
userRouter.post(routes.create_comment, create_comment);
userRouter.post(routes.update_comment, update_comment);
userRouter.get(routes.delete_comment, delete_comment);
export default userRouter;

