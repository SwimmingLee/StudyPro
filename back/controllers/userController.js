import {users} from "../models"
import path from "path"
import multer from "multer"
import jwt from "jsonwebtoken"

export const signin = async function(req, res) {
    try{
        const {email, password} = req.body;
        const user = await users.findOne( {where: {email,platform_type:"local"}});
        if (user) {
            const pass = await user.verify(password);
            if (pass) {
                let accessToken = await user.getToken()
                res.json({
                    state: "success",
                    user: {
                        uid: user.dataValues.id,
                        nickname: user.dataValues.nickname,
                        profile_url: user.dataValues.profile_url,
                        accessToken: accessToken
                    }
                })
            }
            else {   
                res.json({state:"fail"}); 
            }
        } else {
            res.json({state:"fail"});
        }
    } catch(err) {
        res.send(err)
    }
};     


export const social_signin = async function(req, res) {
    try{
        const {email, nickname, gender, platform_type, profile_image} = req.body;
        let user = await users.findOne({ where: { email, platform_type } });
        if (!user) {
            user = await users.save({
                email,
                nickname,
                gender,
                platform_type,
                profile_url: profile_image
            },
            platform_type
            );
        }
        let token = await user.getToken()
            res.json({
                state: "success",
                token: token,
                user: user.dataValues
            })
    } catch (err) {
        console.log(err);
    }

}

// 세션 유지 확인을 위한 토큰 확인 + 확인 후 유저 정보 전송
export const check_token = async function(req, res) {
    try{
        const accessToken = req.header('Authorization')

        if (accessToken) {
            const decoded = await jwt.verify(accessToken, process.env.SECRET_KEY)
            if (decoded) {
                const user = await users.findOne({ where: { id: decoded.user_id } });
                const newAccessToken = await user.getToken()
                res.json({
                    state: "success",
                    user: {
                        uid: user.dataValues.id,
                        nickname: user.dataValues.nickname,
                        profile_url: user.dataValues.profile_url,
                        accessToken: newAccessToken }
                })
            } else {
                res.json({state: "fail", detail: "unable token"})
            }
        } else {
            res.json({state: "fail", detail: "not token"})
        }
    } catch (err) {
        res.send(err)
    }
}


export const read_users = function(req, res) {
    try{
        users.findAll({})
            .map(user => {
                delete user.dataValues.password
                delete user.dataValues.auth
                return user
        }).then(user => {
            res.send(user)
        });
    } catch (err) {
        res.send(err)
    }
}

export const read_user = async (req, res) => {
    try{
        const user = await users.findOne({where: {id:req.params.user_id}})
        delete user.dataValues.password
        delete user.dataValues.auth
        res.send(user);
    } catch (err) {
        res.send(serr)
    }
}

export const update_user = async (req, res) => {
    try{
        const user = res.locals.user;
        const {
            body: {name, nickname, phone, image_update, about},
        } = req;
        const filename = (typeof req.file === 'undefined') ? "profile_default.png"  : req.file.filename
    
        console.log(user, name, nickname, image_update)
        users.update({
            name, nickname, phone, about,
            profile_url: image_update ? process.env.IMAGE_URL + filename : user.profile_url,
            },{where: {id:user.id}
        }).then(user => {
            res.send(user)
        });
    } catch (err) {
        res.send(err)
    }
}

export const update_password = async (req, res) => {
    try{
        const user = res.locals.user;
        const {new_password, password} = req.body;
        
        if(user) {
            users.findOne({where:{id:user.id}})
                .then(async (user) => {
                    const pass = await user.verify(password)            
                    if (pass) {
                        const new_pass = await users.hash(new_password)
                        const update_user = users.update({password:new_pass}, {where:{id:user.id}})
                        if (update_user) {
                            res.json({state: "success"})
                        } else {
                            res.json({state: "fail"})
                        }
                    }else {
                        res.json({state: "fail", detail:"not pass"})
                    }
                })
        } else {
            res.json({state: "fail", detail:"not login"})
        }
    } catch (err) {
        res.send(err)
    }
}
export const delete_user = async (req, res) => {
    try{
        const user = await users.destroy({where: {id:req.params.user_id}})
        res.json({user});
    } catch (err) {
        res.send(err)
    }
}


export const signup = async function(req, res, next) {
    try{
        const {
            body:{email, password, name, nickname, gender, phone, about},
        } = req;
        console.log(about)
        const filename = (typeof req.file === 'undefined') ? "profile_default.png"  : req.file.filename

        const user = await users.findOne({where: {email, platform_type:"local"}})
    
        if(user) {
            res.json( {state: "fail", detail: "userEmail exist"});
            throw new Error("userEmail exist");
        }
        else {
            const new_user = await users.save({
                email, password, name, nickname, gender, phone, about,
                profile_url: process.env.IMAGE_URL + filename,
            }, "local");

            if (new_user) {
                res.json( {state:"success"});
            } else {
                res.json( {state:"fail", detail: "not save"});
            }
        }
    } catch (err) {
        res.send(err)
    }          

}

export const profile_upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads/');
        }, 
        filename: function(req, file, cb) {
            cb(null , new Date().valueOf() + path.extname(file.originalname));
        }
    })
});
