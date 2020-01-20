import jsonwebtoken from "jsonwebtoken"
import {users} from "../models"

const jwt = jsonwebtoken

export const userDetail = (req, res) => res.send("UserDetail");

export const changePassword = (req, res) => res.send("ChangePassword");

export const signin = function(req, res, next) {
    const {email, password} = req.body;

    users.findOne({where: {email}})
        .then(user => {
            if (user) {
                if (user.verify(password)) {
                    let token = jwt.sign(
                        {nickname:user.dataValues.nickname},
                        process.env.SECRET_KEY,
                        {expiresIn : '5m'}
                    )
                    res.cookie("user", token)
                    res.json({
                        state: "success",
                        token: token,
                        user_id: user.dataValues.id
                    })
                } else {
                    res.json({state:"fail"})
                }
            } else {
                res.json({state:"fail"})
            }
        })
};


export const signup = function(req, res, next) {
    const {email, nickname} = req.body;

    users.findOne({where: {email}})
        .then((user)=> {
            if(user) {
                res.send("userEmail exist");
                throw new Error("userEmail exist");
            }
        })
        .then(()=>{
            return users.findOne({where:{nickname}})
        })
        .then((user)=>{
            if(user) {
                res.json({
                    state:"fail",
                    detail: "nickname exist"
                });
                throw new Error("nickname exist");
            }
            else {
                users.save(req.body);
                res.json({
                    state:"success"
                });
            }
        })
        .catch((error)=>{
            console.log(error);
            next(error);
        })

}
