import axios from 'axios'
import AuthHeader from './auth.header'

const URL = process.env.VUE_APP_API_URL + 'works/'

class workService {
    
    getWorks(payload) {
        AuthHeader.changeHeadersToken()
        return axios.get(URL, {
            params:{
                type:payload.type,
                study_id:payload.study_id
            }
        })
    }

    createWork(payload) {
        AuthHeader.changeHeadersToken()
        return axios.post(URL, {
            type:payload.type,
            study_id:payload.study_id,
            group: payload.group,
            name: payload.name,
            content: payload.content,
            start_date: payload.start,
            end_date: payload.end,
            color: payload.color
        })
    }

    deleteWork(payload) {
        AuthHeader.changeHeadersToken()
        return axios.delete(URL, {
            data:{
                type: payload.type,
                work_id: payload.work_id
            }
        })
    }

    updateWork(payload) {
        AuthHeader.changeHeadersToken()
        return axios.put(URL, {
            type:payload.type,
            work_id:payload.work_id,
            group: payload.group,
            name: payload.name,
            content: payload.content,
            start_date: payload.start,
            end_date: payload.end,
            color: payload.color
        })
    }
}

export default new workService()