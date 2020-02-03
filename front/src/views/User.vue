<template>
    <div id="user">
        <signup v-if="!this.$store.getters.isAuth"/>
        <mypage v-else />
    </div>
</template>

<script>
export default {
    name: 'user',
    components: {
        signup: () => import('@/components/user/Signup'),
        mypage: () => import('@/components/user/Mypage'),
    }
}
</script>