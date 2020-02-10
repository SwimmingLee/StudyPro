import UserService from '@/services/user.service'

export const user = {
    actions: {
        async getUserContent({ dummy }, uid) {
            console.log(dummy)
            var user = await UserService.getUserContent(uid)
                .then(res => {
                    return res
                })
            return user
        }
    }
}