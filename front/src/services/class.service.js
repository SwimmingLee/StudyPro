import axios from 'axios'


class ClassService {
    getAllMajorClass() {
        return axios.get(process.env.VUE_APP_API_URL + 'class/major')
    }

    getMinorClass(payload) {
        const major_calss_id = payload;
        return axios.get(process.env.VUE_APP_API_URL + 'class/minor',{
            params:{
                major:major_calss_id,
            }
        })
    }

    getMinorClassByUid(payload) {
        return axios.get(process.env.VUE_APP_API_URL + 'minor', {
            params: {
                uid : payload.uid
            }
        })
    }
}

export default new ClassService()