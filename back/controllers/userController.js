import jsonwebtoken from "jsonwebtoken"
import jwtObj from "../config/jwt"
import {users, studies} from "../models"
import crypto from "crypto"


const jwt = jsonwebtoken
let secretObj = jwtObj

export const userDetail = (req, res) => res.send("UserDetail");
export const changePassword = (req, res) => res.send("ChangePassword");
export const login = function(req, res, next) {

    let token = jwt.sign({
        email : req.body.email
    },
    secretObj.secret,
    {
        expiresIn : '5m'
    })

    users.findAll({
        where: {
            email: req.body.email,
        }
    })
    .then(users => {
        if (users.length) {
            let password = req.body.password
            let cipher = crypto.createCipher('aes192', secretObj.secret)
            cipher.update(password, 'utf8', 'base64')
            const ciphered_password = cipher.final('base64')

            if ( users[0].dataValues.password === ciphered_password) {
                res.cookie("user", token)
                res.json({
                    token: token,
                })
            } else {
                res.send("비밀번호가 틀렸습니다.")
            }
        } else {
            res.send("아이디없음")
        }
    })
};
export const signin = function(req, res) {
    const email = req.body.email
    const nickname = req.body.nickname
    const name = req.body.name
    let password = req.body.password

    let cipher = crypto.createCipher('aes192', secretObj.secret)
    cipher.update(password, 'utf8', 'base64')
    const ciphered_password = cipher.final('base64')

    users.findAll({
        where: {
            email: email
        }
    })
    .then(temp_users => {
        if (temp_users.length) {
            res.send("이미 존재하는 아이디 입니다.")
        } else{
            users.create({
                email,
                name,
                password: ciphered_password,
                nickname,
            })

            res.send(`${email}이 생성되었습니다`)
        }
    })
    .catch(() =>{
        res.send("gg")
    })
}
