import axios from 'axios'

const requestLogin = (email, password) => {
    return axios.post('http://70.12.246.111:4000/users/signin', {
        params: {
            'email': email,
            'password': password
        }
    })
}

export default {
    async login(email, password) {
        try {
            const loginResponse = await requestLogin(email, password)

            return loginResponse
        } catch (err) {
            console.error(err)
        }
    }
}