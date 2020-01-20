import express from "express"
import routes from "../routes"
import {create_common_post} from "../controllers/postController"




const common_postRouter = express.Router();

common_postRouter.post(routes.post,create_common_post);



export default common_postRouter;