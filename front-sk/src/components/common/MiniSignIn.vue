<template>
  <div class="mx-5">
    <v-row class="justify-center">
      <v-col class="pb-0" sm="11">
        <v-btn large block color="primary">Sign In</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center pt-1 pb-0">
        <v-btn to="/join" text small>Create Acount</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    dialog: false
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