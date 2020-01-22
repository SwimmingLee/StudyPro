import express from "express"
import routes from "../routes"
import passport from "passport"
import { user, userDetail, changePassword, signup, signin, read_users } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.home, read_users);
userRouter.get(routes.changePassword, changePassword);
userRouter.post(routes.signup, signup);
//userRouter.post(routes.signin, signin);
userRouter.post(routes.signin, (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {   
            return res.status(400).json({state:"fail"});
        }
        req.login(user, {session: false}, (err) => {
            if (err) { 
            } else {
                const token = user.getToken();
                return res.json({
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,             
                    },
                    token
                })
            }
        })
    })(req, res, next);
}
);

userRouter.get('/kakao', passport.authenticate('kakao', {session: false}));
userRouter.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
    session: false,
}), (req, res) => {
    res.redirect(routes.home);
});
userRouter.get(routes.userDetail, userDetail);
export default userRouter;