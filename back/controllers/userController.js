import {users} from "../models"
import path from "path"
import multer from "multer"
import jwt from "jsonwebtoken"

export const signin = async function(req, res) {
    const {email, password} = req.body;
    const user = await users.findOne(  
        {where: {
                email,
                platform_type:"local",
            }
        });
    
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
};     


export const social_signin = async function(req, res) {
    const {email, nickname, gender, platform_type, profile_image} = req.body;
    try{
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
                    accessToken: newAccessToken
                }

            })
        } else {
            res.json({state: "fail", detail: "unable token"})
        }
    } else {
        res.json({state: "fail", detail: "not token"})
    }
    
}


export const read_users = function(req, res) {
    users.findAll({})
        .map(user => {
                delete user.dataValues.password
                delete user.dataValues.auth
                return user
        })
        .then(user => {
            res.send(user)
        });
}

export const read_user = async (req, res) => {
    const user = await users.findOne({where: {id:req.params.user_id}})
    delete user.dataValues.password
    delete user.dataValues.auth
    res.send(user);
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


export const signup = async function(req, res, next) {
    const {
        body:{email, password, name, nickname, gender, phone},
        file:{filename}
    } = req;
    console.log("방디: ", req.body);
    console.log("파일 ", req.file);
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
        const new_user = await users.save({
            email, password, name, nickname, gender, phone, 
            profile_url: filename,
        }, "local");

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
