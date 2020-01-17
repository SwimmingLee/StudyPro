import express from "express"
import routes from "../routes"
import {create_post, read_post} from "../controllers/common_postController"

const common_postRouter = express.Router();


common_postRouter.post(routes.common_post, create_post);
//common_postRouter.get(routes.common_post, read_all_post); //board, writer 
common_postRouter.get(routes.common_post_detail, read_post);
//common_postRouter.delete(routes.common_post_detail, delete_post);
//common_postRouter.put(routes.comments_post_detail, upate_post);


export default common_postRouter;