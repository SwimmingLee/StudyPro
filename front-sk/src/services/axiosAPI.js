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

const requestSocialLogin = (email, nickname, gender, platform) => {
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

const requestCheckToken = (token) => {
    return axios({
        method: 'POST',
        url: 'http://15.164.245.201:8000/users/token',
        data: {
            'token': token
        }
    })
}

const requestSignup = (email, nickname, name, password, gender, phone) => {
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

const requestGetGroup = (id, token) => {
    return axios({
        method: 'GET',
        url: 'http://15.164.245.201:8000/studies/detail',
        params: {
            'id': id
        },
        headers: {
            'accessToken': token
        }
    })
}

const requestGetGroups = (payload) => {
    return axios({
        method: 'GET',
        url: 'http://15.164.245.201:8000/studies/detail',
        params: {
            'name': payload.name,
            'start_date': payload.startdate,
            'start_time': payload.starttime,
            'end_time': payload.endtime,
            'days': payload.duration,
            'tags': payload.tags,
            'minor_class': payload.minorClass,
            'goal': payload.goal
        }
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
    async socialLogin(email, nickname, gender, platform) {
        try {
            const socialLoginResponse = await requestSocialLogin(email, nickname, gender, platform)
            return socialLoginResponse.data
        } catch (err) {
            console.error(err)
        }
    },
    async checkToken(token) {
        try {
            const checkTokenResponse = await requestCheckToken(token)
            return checkTokenResponse.data
        } catch (err) {
            console.error(err);
        }
    },
    async signup(email, nickname, name, password, gender, phone) {
        try {
            const singupRespone = await requestSignup(email, nickname, name, password, gender, phone)
            return singupRespone.data
        } catch (err) {
            console.error(err)
        }
    },
    async getGroup(id, token) {
        try {
            const getGroupResponse = await requestGetGroup(id, token)
            return getGroupResponse.data
        } catch (err) {
            console.error(err)
        }
    },
    async getGroups(payload) {
        try {
            const getGroupsResponse = await requestGetGroups(payload)
            return getGroupsResponse.data
        } catch (err) {
            console.error(err)
        }
    },
}