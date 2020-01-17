import express from "express"
import routes from "../routes"
import { create_comment } from "../controllers/common_commentController";


const common_commentRouter = express.Router();



export default common_commentRouter;

