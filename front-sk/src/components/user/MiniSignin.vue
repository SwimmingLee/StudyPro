<template>
  <div class="mx-5">
    <v-row class="justify-center">
      <v-col class="pb-0" sm="11">
        <v-btn large block color="primary" @click="signinModal = true">Sign In</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center pt-1 pb-0">
        <v-btn to="/signup" text small>Create Acount</v-btn>
      </v-col>
    </v-row>

    <signin-modal :signin-modal="signinModal" v-on:close="signinClose"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    signinModal: false,
    checkbox: false,
  }),
  components: {
    signinModal: () => import('@/components/user/SigninModal')
  },
  methods: {
    ...mapActions(['login']),
    async onLogin () {
      try {
        let loginResult = await this.login({email: this.email, password: this.password})
        console.log(loginResult)
      } catch (err) {
        console.error(err)
      }
    },
    signinClose(){
      this.signinModal = false
    }
  },
}
</script>