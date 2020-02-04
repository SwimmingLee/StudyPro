import axios from 'axios'


class StudyService {
    getAllStudy() {
        return axios.get(process.env.VUE_APP_API_URL + "studies") 
    }

    // // 스터디 검색에 들어가는 내용들이 있어야 한다.
    // getStudy(payload) {
    //     //const { minorclass, majorclass}  = payload
    //     //return axios.get

    // }

    createStudy = (payload) => {
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

        return axios.post(process.env.VUE_APP_API_URL + "studies" ,
                payload
            )
    
        
    }
    

}

export default new StudyService()