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
        MiniSignin: () => import('@/components/common/MiniSignin'),
        MiniUserInfo: () => import('@/components/common/MiniUserInfo')
    },
    computed: {
        ...mapState(['isAuth'])
    }
}
</script>