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
            'nickname': nickname,
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

const requestSignup = (formData) => {
    return axios({
        method: 'POST',
        url: 'http://15.164.245.201:8000/users/signup',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
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

const requestGetGroups = () => {
    return axios({
        method: 'GET',
        url: 'http://15.164.245.201:8000/studies',
    })
}

const requestGetMajorClasses = () => {
    return axios({
        method: 'GET',
        url: 'http://15.164.245.201:8000/class/major',
    })
}

const requestGetMinorClasses = (majorClass) => {
    return axios({
        method: 'GET',
        url: 'http://15.164.245.201:8000/class/minor',
        params: {
            major: majorClass
        }
    })
}

const requestCreateGroup = (payload) => {
    const {
        minor_class_id, //int(11)	YES	MUL	
        captain, //int(11)	NO	MUL	
        name, //varchar(45)	NO	UNI	
        goal, //varchar(45)	YES		
        description, //longtext	NO		
        user_limit, //int(11)	YES		
        start_time, //int(11)	YES		
        end_time, //int(11)	YES		
        status, //varchar(45)	YES		
        start_date, //date	YES		
        end_date, //date	YES		
        isopen, //tinyint(4)	YES	
        days,
        accessToken
    } = payload;
    return axios({
        method: 'POST',
        url: 'http://15.164.245.201:8000/studies/create',
        headers: {
            'accessToken': accessToken
        },
        data: {
            minor_class_id, //int(11)	YES	MUL	
            captain, //int(11)	NO	MUL	
            name, //varchar(45)	NO	UNI	
            goal, //varchar(45)	YES		
            description, //longtext	NO		
            user_limit, //int(11)	YES		
            start_time, //int(11)	YES		
            end_time, //int(11)	YES		
            status, //varchar(45)	YES		
            start_date, //date	YES		
            end_date, //date	YES		
            isopen, //tinyint(4)	YES	
            days
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
    async signup(formData) {
        try {
            const singupRespone = await requestSignup(formData)
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

    async getMajorClasses() {
        try {
            const getMajorClassesReponse = await requestGetMajorClasses()
            return getMajorClassesReponse;
        } catch (err) {
            console.log(err);
        }
    },

    async getMinorClasses(payload) {
        try {
            const getMinorClassesReponse = await requestGetMinorClasses(payload)
            return getMinorClassesReponse;
        } catch (err) {
            console.log(err);
        }
    },

    async createGroup(payload) {
        try {
            const createGroupResponse = await requestCreateGroup(payload)
            return createGroupResponse
        } catch (err) {
            console.log(err);
        }
    }


}