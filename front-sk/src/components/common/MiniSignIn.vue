<template>
  <div class="mx-5">
    <v-row>
      <v-text-field v-model="email" label="E-mail" hide-details="auto"/>
    </v-row>
    <v-row>
      <v-text-field v-model="password" label="Password"/>
    </v-row>
    <v-row class="justify-end" sm="4">
      <div class="ma-1">
        <v-btn color="white">Sign Up</v-btn>
      </div>
      <div class="ma-1">
        <v-btn @click.prevent="onLogin" color="white">Sign In</v-btn>
      </div>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    ...mapActions(['login']),
    async onLogin () {
      try {
        let loginResult = await this.login({email: this.email, password: this.password})
        console.log(loginResult)
      } catch (err) {
        console.error(err)
      }
    }

  }
}
</script>