<template>
  <div class="mx-5">
    <v-row class="justify-center">
      <v-col class="pb-0" sm="11">
        <v-btn @click="loginModal = !loginModal" large block color="primary">Sign In</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center pt-1 pb-0">
        <v-btn to="/join" text small>Create Acount</v-btn>
      </v-col>
    </v-row>
      <!-- loginModal -->
      <v-dialog v-model="loginModal" max-width="600px">
        <v-card id="lgiModal" class="px-0 pt-0">
          <v-card-title class="customTheme darken-2 white--text pb-3">
            <span class="headline">Log In</span>
          </v-card-title>
          <v-card-text class="py-0 px-7">
            <v-container class="pb-0">
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-icon left>email</v-icon>
                  <v-text-field v-model="email" label="E-mail" required type="email"></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    hint="비밀번호는 8자리 이상의 문자 + 숫자 조합입니다"
                    label="Password"
                    required
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-col>
                <v-checkbox
                  class="py-0 mb-0"
                  v-model="checkbox"
                  label="로그인 상태 유지"
                  color="primary"
                  value="primary"
                  hide-details
                ></v-checkbox>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="pt-0 pr-5">
            <v-spacer></v-spacer>
            <v-btn color="error lighten-1" tile @click="loginModal= false">창 닫기</v-btn>
            <v-btn color="customTheme darken-2 white--text" tile @click="onLogin">로그인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    loginModal: false,
    checkbox: false,
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