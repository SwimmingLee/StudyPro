import express from "express"
import routes from "../routes"
import {create_common_post, read_common_post, update_common_post, delete_common_post, list_common_post} from "../controllers/postController"



// //Common Post
// const COMMON_POSTS = "/common_posts";
// //Study Post
// const STUDY_POSTS = "/study_posts";

// const POST = "/post"
// const COMMON_POST = "/post/:board";
// const STUDY_POST = "/post/:study_id&:board";
// const COMMON_POST_DETAIL = "/detail/:post_id";
// const STUDY_POST_DETAIL = "/detail/:study_id&:post_id";


const common_postRouter = express.Router();

common_postRouter.get(routes.common_post,list_common_post);
common_postRouter.post(routes.post,create_common_post);
common_postRouter.get(routes.common_post_detail,read_common_post);
common_postRouter.put(routes.common_post_detail,update_common_post);
common_postRouter.delete(routes.common_post_detail,delete_common_post);



export default common_postRouter;