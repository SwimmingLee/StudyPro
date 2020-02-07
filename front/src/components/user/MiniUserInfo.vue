<template>
    <div>
        <v-row class="mx-1">
            <v-col>
            <v-btn to='/msgbox' elevation="0" color='white'>
                    <v-icon style="color:black">mdi-email</v-icon>
                    <span>쪽지함</span>
            </v-btn>
            </v-col>
            <v-col>
            <v-btn @click="logout()" class="transparent" elevation=0 style="float:right;">
                <span class="italic">로그아웃</span>
            </v-btn>
            </v-col> 
        </v-row>
        <v-row class="text-center">
            <v-flex justify-center>
                <span class="mr-2">Hello!!
                </span>  
                    <span class="blue--text lighten-2">{{ currentUser.nickname }}</span>
            </v-flex>
        </v-row>
    </div>
</template>

<script>
export default {
    methods:{
        logout(){
            this.$store.dispatch('auth/logout')
            location.reload()
        }
    },
    computed: {
        currentUser(){
            return this.$store.getters['auth/getUser']
        }
    }
}
</script>