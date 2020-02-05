import axios from 'axios'

const URL = process.env.VUE_APP_API_URL + 'studies/'

class StudyService {
    getAllStudy() {
        return axios.get(process.env.VUE_APP_API_URL + "studies")
    }

    // // 스터디 검색에 들어가는 내용들이 있어야 한다.
    // getStudy(payload) {
    //     //const { minorclass, majorclass}  = payload
    //     //return axios.get

    // }

    createStudy = (payload, token) => {
        // const {
        //     minor_class_id,	
        //     captain,		
        //     name,	
        //     goal,	
        //     description,		
        //     user_limit,		
        //     start_time,		
        //     end_time,		
        //     status,	
        //     start_date,	
        //     end_date,	
        //     isopen,	
        //     days,
        //     accessToken	
        // } = payload;
        this.changeHeadersToken(token)
        return axios.post(URL + "create",
                payload
            )
            .then(res => {
                return Promise.resolve(res.data)
            })
    }

    // 헤더에 포함되는 토큰 업데이트
    changeHeadersToken(token) {
        axios.defaults.headers.common['Authorization'] = token;
    }
}

export default new StudyService()