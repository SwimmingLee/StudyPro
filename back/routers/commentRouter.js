import express from "express"
import routes from "../routes"
import { create_comment,read_comments, update_comment,delete_comment } from "../controllers/commentController";


const commentRouter = express.Router();



commentRouter.get(routes.comment, read_comments);
commentRouter.post(routes.comment, create_comment);
commentRouter.put(routes.comment, update_comment);
commentRouter.delete(routes.comment, delete_comment);

export default commentRouter;

