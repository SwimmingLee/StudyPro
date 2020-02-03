<template>
    <div>
        <v-row class="justify-end mr-2">
            <v-btn @click="logout()" class="transparent" elevation=0>
                <span class="italic">sign out</span>
            </v-btn> 
        </v-row>
        <v-row class="text-center">
            <v-flex justify-center>
                <span class="justify-center">Hello!! 
                    <span class="blue--text lighten-2">{{ currentUser.nickname }}</span>
                </span>  
            </v-flex>
        </v-row>
    </div>
</template>

<script>
export default {
    computed: {
        currentUser(){
            return this.$store.state.auth.user
        }
    }
}
</script>