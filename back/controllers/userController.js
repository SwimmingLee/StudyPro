import {users} from "../models";
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
            let token = await user.getToken()
            res.cookie("accessToken", token)
            res.json({
                state: "success",
                token: token,
                user: user.dataValues
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
    const {email, nickname, gender, platform_type} = req.body;
    try{
        let user = await users.findOne({ where: { email, platform_type } });
        if (!user) {
            user = await users.save({
                email,
                nickname,
                gender,
                platform_type,
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

export const check_token = async function(req, res) {
    const {token} = req.body;
    if (token) {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY)
        if (decoded) {
            const user = await users.findOne({ where: { id: decoded.user_id } });
            const token = await user.getToken()
            res.json({
                state: "success",
                token: token,
                user: user.dataValues
            })
        }
    } else {
        res.json({
            state: "fail",
            detail: "not token"
    })
}
    
}


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
