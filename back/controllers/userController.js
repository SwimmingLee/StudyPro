import {users} from "../models";
import passport from "passport";

export const userDetail = (req, res) => res.send("UserDetail");

export const changePassword = (req, res) => res.send("ChangePassword");

export const local_signin = async function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ state: "fail" });
        }
        req.login(user, { session: false }, (err) => {
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
};            


export const kakao_signin = passport.authenticate('kakao', {session: false});
export const kakao_signin_callback =  passport.authenticate('kakao', {
        failureRedirect: '/',
        session: false,
    });

export const naver_signin = passport.authenticate('naver', {session: false});
export const naver_signin_callback = passport.authenticate('naver', {
        failureRedirect: '/',
        session: false,
    });

export const read_users = function(req, res) {
    users.findAll({})
        .then(user => {
            res.send(user)
        })
}

export const signup = async function(req, res, next) {
    const {email} = req.body;

    const user = await users.findOne(  
        {where: {
                email,
                platform_type:"local",
            }
        });
    
    if(user) {
        res.send("userEmail exist");
        throw new Error("userEmail exist");
    }
    else {
        const new_user = await users.save(req.body, "local");

        if (new_user) {
            res.json({
                state:"success"
            });
        } else {
            res.json({state:"fail"});
        }
    }          

}
