import {users} from "../models";
import passport from "passport";

export const read_users = function(req, res) {
    users.findAll({})
        .then(user => {
            res.send(user)
        })
}
export const read_user = async (req, res) => {
    const user = await users.findOne({where: {id:req.params.user_id}})
    res.json({
        user: {
            id: user.id,
            email: user.email,
            phone: user.phone,
            name: user.name,
            nickname: user.nickname,
            gender: user.gender
        },
    });
}

export const update_user = async (req, res) => { 
    //const user_info = req.body;
    //const user = await users.update_user(user_info, { where: { id: req.params.user_id } })

    res.json({
        state: "updating...",
    });

}
export const delete_user = async (req, res) => {
    const user = await users.destroy({where: {id:req.params.user_id}})
    res.json({user});
}

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
                    state: "success",
                    user: {
                        id: user.id,
                        email: user.email,
                        phone: user.phone,
                        name: user.name,
                        nickname: user.nickname,
                        gender: user.gender
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


export const signup = async function(req, res, next) {
    const {email} = req.body;

    const user = await users.findOne(  
        {where: {
                email,
                platform_type:"local",
            }
        });
    
    if(user) {
        res.json({
            state: "fail",
            detail: "userEmail exist"
        });
        throw new Error("userEmail exist");
    }
    else {
        const new_user = await users.save(req.body, "local");

        if (new_user) {
            res.json({
                state:"success"
            });
        } else {
            res.json({
                state:"fail",
                detail: "not save"
            });
        }
    }          

}
