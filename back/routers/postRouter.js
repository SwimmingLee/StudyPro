import express from "express"
import routes from "../routes"
import {create_post, read_post} from "../controllers/postController"

const common_postRouter = express.Router();



export default common_postRouter;