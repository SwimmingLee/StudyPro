import axios from 'axios'

const URL = process.env.VUE_APP_API_URL + "alarms/";

class AlarmService {
    getReceivedAlarm() {
        return axios.get(URL, {
            params: {
                direction: "toUser"
            }
        })
    }

    getSendAlarm() {
        return axios.get(URL, {
            params: {
                direction: "fromUser"
            }
        })
    }

    sendAlarm(payload) {
        const { to , title, content} = payload
        console.log(to, title, content)
        return axios.post(URL, {
            to, title, content
        })
        
    }


}

export default new AlarmService()