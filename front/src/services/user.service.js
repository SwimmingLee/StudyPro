import axios from 'axios'
import authHeader from './auth-header'
import dotenv from "dotenv"

dotenv.config();

class UserService {
    getUserContent() {
        return axios.get(process.env.API_URL + "token", { headers: authHeader() })
    }


    getUserContentById(payload) {
        return axios.get(process.env.API_URL + "/:uid", 
            {data:{
                uid: payload.uid  
        }})
    }

    requestSocialLogin = (email, nickname, gender, platform) => {
        return axios({
            method: 'POST',
            url: 'http://15.164.245.201:8000/users/social/signin',
            data: {
                'email': email,
                'nickname':nickname,
                'gender': gender,
                'platform_type': platform
            }
        })
    }

    
}

export default new UserService()