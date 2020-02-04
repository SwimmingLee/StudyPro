import axios from 'axios'

const API_URL = 'http://15.164.245.201:8000/alram/'

class AlramService {
    getReceivedAlarmByUid(payload) {
        return axios.get(API_URL, {
            params: {
                to: payload.uid
            }
        })
    }

    getSendAlarmByUid(payload) {
        return axios.get(API_URL, {
            params: {
                from: payload.uid
            }
        })
    }

    sendAlaram(payload) {
        const { from, to , title, content} = payload
        return axios.post(API_URL, {
            data: {
                from, to, title, content
            }
        })
    }


}

export default new AlramService()