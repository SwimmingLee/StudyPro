import loginAPI from './loginAPI'

export default {
    async login(email, password) {
        try {
            const loginResponse = await loginAPI.login(email, password)
            return loginResponse
        } catch (err) {
            console.error(err)
        }
    }
}