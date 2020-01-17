<template>
    <v-row>
        <v-col cols="12">
            <p class="font-weight-bold ml-5">Sign In</p>
            <mini-signin/>
        </v-col>
    </v-row>
</template>

<script>
export default {
    components: {
        MiniSignin: () => import('@/components/common/MiniSignin'),
    }
}
</script>