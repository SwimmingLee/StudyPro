import axios from 'axios'

const API_URL = 'http://15.164.245.201:8000/users/'

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                email: user.email,
                password: user.password
            })
            .then(this.handleResponse)
            .then(response => {
                if (response.data.accessToken) {
                    if (user.loginRemain) {
                        localStorage.setItem('user', JSON.stringify(response.data))
                    } else {
                        sessionStorage.setItem('user', JSON.stringify(response.data))
                    }
                }

                return response.data
            })
    }

    logout() {
        localStorage.removeItem('user')
    }

    register(formData) {
        return axios.post(API_URL + 'signup', formData)
    }

    handleResponse(response) {
        if (response.status === 401) {
            this.logout()
            location.reload(true)

            const error = response.data && response.data.message
            return Promise.reject(error)
        }

        return Promise.resolve(response)
    }
}

export default new AuthService()