import express from "express"
import routes from "../routes"
import {post_save} from "../controllers/common_postController"

const common_postRouter = express.Router();


common_postRouter.post(routes.create_common_post, post_save);

export default common_postRouter;