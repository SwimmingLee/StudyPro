import axios from 'axios'

const requestLogin = (email, password) => {
    return axios({
        method: 'POST',
        url: 'http://15.164.245.201:8000/users/signin',
        // headers: {
        //     'accessToken': '^__^'
        // },
        data: {
            'email': email,
            'password': password
        },
    })
}

const requestSignup = (email, nickname, name, password, gender, phone) => {
    console.log(email + " / " + password)
    return axios({
        method: 'POST',
        url: 'http://15.164.245.201:8000/users/signup',
        data: {
            'email': email,
            'nickname': nickname,
            'name': name,
            'password': password,
            'gender': gender,
            'phone': phone
        },
    })
}

export default {
    async login(email, password) {
        try {
            const loginResponse = await requestLogin(email, password)
            return loginResponse.data
        } catch (err) {
            console.error(err)
        }
    },
    async signup(email, nickname, name, password, gender, phone) {
        try {
            const singupRespone = await requestSignup(email, nickname, name, password, gender, phone)
            return singupRespone.data
        } catch (err) {
            console.error(err)
        }
    }
}