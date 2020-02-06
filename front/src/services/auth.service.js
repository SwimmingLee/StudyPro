import axios from 'axios'


class AuthService {
    // 초기 유저 정보업데이트
    checkUserDefault(user) {
        this.changeHeadersToken(user.accessToken)
        return axios.post(process.env.VUE_APP_API_URL + 'users/token')
            .then(this.handleResponse)
            .then(res => {
                this.changeHeadersToken(res.data.user.accessToken)
                return res.data
            })
    }

    // 헤더에 포함되는 토큰 업데이트
    changeHeadersToken(token) {
        axios.defaults.headers.common['Authorization'] = token;
    }

    // 로그인
    login(user) {
        return axios
            .post(process.env.VUE_APP_API_URL + 'users/signin', {
                email: user.email,
                password: user.password
            })
            .then(this.handleResponse)
            .then(
                response => {
                    if (response.data.state == 'success') {
                        if (user.loginRemain) {
                            localStorage.setItem('user', JSON.stringify(response.data.user))
                        } else {
                            sessionStorage.setItem('user', JSON.stringify(response.data.user))
                        }

                        return response.data.user;
                    } else {
                        return {}
                    }
                })
    }

    

    // 로그아웃
    logout() {
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
    }

    register(formData) {
        return axios.post(process.env.VUE_APP_API_URL + 'users/signup', formData).then(
            res => {
                if (res.data.state == 'success') {
                    return Promise.resolve(res.data)
                } else {
                    return Promise.reject(res.data)
                }
            }
        )
    }

    // 응답에 에러가 있으면 로그아웃 시킨다.
    handleResponse(response) {
        if (response.status === 401) {
            this.logout()
            location.reload(true)

            const error = response.data.state
            return Promise.reject(error)
        }

        return Promise.resolve(response)
    }
}

export default new AuthService()