<template>
    <v-row>
        <v-col cols="12 pa-0 pb-2">
            <mini-signin v-if="!isAuth"/>
            <mini-user-info v-else/>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
    components: {
        MiniSignin: () => import('@/components/user/MiniSignin'),
        MiniUserInfo: () => import('@/components/user/MiniUserInfo')
    },
    computed: {
        ...mapState(['isAuth'])
    }
}
</script>