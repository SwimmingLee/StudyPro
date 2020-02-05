import axios from 'axios'

class AlramService {
    getReceivedAlarmByUid(payload) {
        return axios.get(process.env.VUE_APP_API_URL + "alarms/", {
            params: {
                direction: "toUser"
            }
        })
    }

    getSendAlarmByUid(payload) {
        return axios.get(process.env.VUE_APP_API_URL + "alarms/", {
            params: {
                direction: "fromUser"
            }
        })
    }

    sendAlarm(payload) {

        const { to , title, content} = payload
        return axios.post(API_URL, {
            data: {
                from, to, title, content
            }
        })
    }


}

export default new AlramService()