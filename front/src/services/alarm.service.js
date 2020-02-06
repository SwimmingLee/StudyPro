import axios from 'axios'

class AlarmService {
    getReceivedAlarm() {
        return axios.get(process.env.VUE_APP_API_URL + "alarms/", {
            params: {
                direction: "toUser"
            }
        })
    }

    getSendAlarm() {
        return axios.get(process.env.VUE_APP_API_URL + "alarms/", {
            params: {
                direction: "fromUser"
            }
        })
    }

    sendAlarm(payload) {

        const { to , title, content} = payload
        console.log(to, title, content)
        return axios.post(process.env.VUE_APP_API_URL + "alarms/", {
            to, title, content
        })
        
    }


}

export default new AlarmService()