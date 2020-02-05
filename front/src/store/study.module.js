import ClassService from '@/services/class.service'
import StudyService from '@/services/study.service'

export const study = {
    namespaced: true,
    actions: {
        // 대분류 요청
        getMajorClass() {
            console.log('module')
            return ClassService.getAllMajorClass()
        },

        // 대분류에 따른 소분류 요청
        getMinorClass({ dummy }, majorID) {
            console.log('getMinorClass', dummy)
            return ClassService.getMinorClass(majorID)
        },

        // 스터디 생성
        createStudy({ dummy }, payload) {
            console.log('createStudy ', dummy)
            return StudyService.createStudy(payload)
        },

        // 스터디모임 전체 목록요청
        getAllStudy() {
            console.log('module enter')
            return StudyService.getAllStudy()
                .then(res => {
                    console.log('module ', res)
                    return res
                })
        }
    }
}