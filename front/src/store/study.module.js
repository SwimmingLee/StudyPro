import ClassService from '@/services/class.service'
import StudyService from '@/services/study.service'

export const study = {
    namespaced: true,
    actions: {
        // 대분류 요청
        getMajorClass() {
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
            return StudyService.createStudy(payload[0], payload[1])
        }
    }
}