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
                    <span class="blue--text lighten-2">{{ userNickname }}</span>
                </span>  
            </v-flex>
        </v-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
    computed: {
        ...mapState(['userNickname'])
    },
    methods: {
        ...mapActions(['logout']),
    }
}
</script>