import {users} from "../models"

export const userDetail = (req, res) => res.send("UserDetail");

export const changePassword = (req, res) => res.send("ChangePassword");

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
                user_id: user.dataValues.id
            })
        }
        else {   
            res.json({state:"fail"}); 
        }
    } else {
        res.json({state:"fail"});
    }
};            

export const read_users = function(req, res) {
    users.findAll({})
        .then(user => {
            res.send(user)
        })
}

export const signup = async function(req, res, next) {
    const {email} = req.body;

    const user = await users.findOne(  
        {   
            where: 
            {
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
