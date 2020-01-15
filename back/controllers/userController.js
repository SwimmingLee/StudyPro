import jsonwebtoken from "jsonwebtoken"
import {users, studies} from "../models"
import crypto from "crypto"


const jwt = jsonwebtoken

export const userDetail = (req, res) => res.send("UserDetail");

export const changePassword = (req, res) => res.send("ChangePassword");

export const signin = function(req, res, next) {
    const {email, password} = req.body;

    let token = jwt.sign({
        email
    },
    process.env.SECRET_KEY,
    {
        expiresIn : '5m'
    })

    
    users.findOne({where: {email}})
        .then(user => {
            if (user) {
                let cipher = crypto.createCipher('aes192', process.env.SECRET_KEY)
                cipher.update(password, 'utf8', 'base64')
                const ciphered_password = cipher.final('base64')

                if ( user.dataValues.password === ciphered_password) {
                    res.cookie("user", token)
                    res.json({
                        token: token,
                    })
                } else {
                    res.send("password incorrect")
                }
            } else {
                res.send("email not exist")
            }
        })
};


export const signup = function(req, res, next) {
    const {email, nickname, name, password, gender, auth} = req.body;

    let cipher = crypto.createCipher('aes192', process.env.SECRET_KEY)
    cipher.update(password, 'utf8', 'base64')
    const ciphered_password = cipher.final('base64')

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
                res.send("nickname exist");
                throw new Error("nickname exist");
            }
            else {
                users.create({
                    email,
                    name,
                    password: ciphered_password,
                    nickname,
                    gender,
                    auth
                })
                res.send(`create ${email}`)
            }
        })
        .catch((error)=>{
            //console.log(error);
        })

}
