import axios from 'axios'

class PostService {
    createPost(payload) {
        return axios.post(process.env.VUE_APP_API_URL + "post", 
            payload
    )}

    // 스터디 검색에 들어가는 내용들이 있어야 한다.
    getStudy(payload) {
        //const { minorclass, majorclass}  = payload
        //return axios.get

    }

}

export default new StudyService()