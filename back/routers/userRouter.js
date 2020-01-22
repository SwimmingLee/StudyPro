import express from "express"
import routes from "../routes"
import { 
    userDetail, 
    changePassword, 
    signup, 
    read_users, 
    local_signin, 
    kakao_signin,
    naver_signin, 
    kakao_signin_callback,
    naver_signin_callback } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.home, read_users);
userRouter.get(routes.changePassword, changePassword);
userRouter.post(routes.signup, signup);
userRouter.post(routes.signin, local_signin);

userRouter.get('/kakao', kakao_signin);
userRouter.get('/kakao/callback',kakao_signin_callback, (req, res) => {
    res.redirect(routes.home);
});

userRouter.get('/naver', naver_signin);
userRouter.get('/naver/callback',naver_signin_callback, (req, res) => {
    res.redirect(routes.home);
});

userRouter.get(routes.userDetail, userDetail);
export default userRouter;