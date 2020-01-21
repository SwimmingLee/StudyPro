import loginAPI from './loginAPI'

export default {
    async login(email, password) {
        try {
            const loginResponse = await loginAPI.login(email, password)
            return loginResponse
        } catch (err) {
            console.error(err)
        }
    },
    async signup(email, nickname, name, password, gender, phone) {
        try {
            const singupRespone = await loginAPI.signup(email, nickname, name, password, gender, phone)
            return singupRespone
        } catch (err) {
            console.error(err)
        }
    }
}