import axios from 'axios'


class PostService {
    createPost(payload) {
        return axios.post(process.env.VUE_APP_API_URL + "posts/detail",
            payload
        )
    }

    // 스터디 검색에 들어가는 내용들이 있어야 한다.
    // getStudy(payload) {
    //     //const { minorclass, majorclass}  = payload
    //     //return axios.get

    // }
    getPostNumber(payload) {
        return axios.get(process.env.VUE_APP_API_URL + "posts/number",
        {
            params: {
                board: payload.board,
                type: payload.type,
                study_id: payload.study_id
            }
        })
    }


    getAllPost(payload) {
        return axios.get(process.env.VUE_APP_API_URL + "posts/list",
        {
            params:{
                board: payload.board,
                type: payload.type,
                study_id: payload.study_id,
                offset: payload.offset,
            }
        })
    }
}

export default new PostService()