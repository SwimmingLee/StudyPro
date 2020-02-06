import express from "express"
import routes from "../routes"
import path from "path"
import { 
    read_users, 
    read_user, 
    update_user, 
    delete_user,
    signup, 
    signin,
    social_signin,
    check_token,
    profile_upload
} from "../controllers/userController"

const userRouter = express.Router();

userRouter.post(routes.signup, profile_upload.single('img'), signup);
userRouter.post(routes.signin, signin);
userRouter.post(routes.social_signin, social_signin);
userRouter.post(routes.check_token, check_token);
userRouter.get(routes.home, read_users);
userRouter.get(routes.userDetail, read_user);
userRouter.put(routes.userDetail, update_user);
userRouter.delete(routes.userDetail, delete_user);

export default userRouter;