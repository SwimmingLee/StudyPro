import axiosAPI from './axiosAPI'

export default {
    async login(email, password) {
        try {
            const loginResponse = await axiosAPI.login(email, password)
            return loginResponse
        } catch (err) {
            console.error(err)
        }
    },
    async signup(email, nickname, name, password, gender, phone) {
        try {
            const singupRespone = await axiosAPI.signup(email, nickname, name, password, gender, phone)
            return singupRespone
        } catch (err) {
            console.error(err)
        }
    }
}