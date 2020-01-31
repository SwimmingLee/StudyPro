<template>
  <v-dialog v-model="open" max-width="500px">
    <v-card id="entireBox" class="px-0 pt-0">
      <v-card-title class="customTheme darken-2 white--text pb-3">
        <span class="headline">Sign In</span>
      </v-card-title>
      <v-card-text class="py-0 px-7">
        <v-container class="pb-0">
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-text-field required type="email" :rules="idRules" v-model="id">
                <template v-slot:label>
                  <strong>
                    <v-icon style="vertical-align: middle">email</v-icon>
                  </strong>
                  E-mail
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field required :rules="passwordRules" type="password" v-model="password">
                <template v-slot:label>
                  <strong>
                    <v-icon style="vertical-align: middle">lock</v-icon>
                  </strong>
                  Password
                </template>
              </v-text-field>
            </v-col>
            <v-col class="pa-0 pl-4">
              <a id="kakao-login-btn"></a>
              <button class="social-btn mr-4" @click="AuthKakaoSignin('kakao')" style="width:50px">
                <v-img src="@/assets/images/social-btn/kakaolink_btn_medium.png"></v-img>
              </button>
            </v-col>
            <v-checkbox
              id="modalCheckbox"
              class="py-0 mb-0"
              v-model="signinRemain"
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
        <v-btn color="error--text lighten-1 transparent" @click="close" elevation="0">Close</v-btn>
        <v-btn color="transparent" @click="signin" elevation="0">Sign in</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import WbKakao from "@/social-signin/kakao/kakao";


export default {
  data: () => ({
    signinRemain: false,
    open: false,
    idRules: [v => !!v || "아이디를 입력해 주세요."],
    passwordRules: [v => !!v || "비밀번호를   입력해 주세요."],
    id: "",
    password: "",
  }),
  computed: {
    ...mapState(["token"])
  },
  props: ["signinModal"],
  watch: {
    signinModal() {
      this.open = this.signinModal;
    },
    open() {
      if (!this.open) {
        this.close();
      }
    }
  },
  mounted() {

  },
  methods: {
    ...mapActions(["socialLogin", "logout", "login"]),
    close() {
      this.$emit("close");
    },
    signin() {
      this.login({
        email: this.id,
        password: this.password
      });
    },
    async AuthKakaoSignin() {
      const user_info = await WbKakao.signinForm();
      let {
        properties: { nickname },
        kakao_account: { email, gender }
      } = user_info;

      try {
        gender = gender === "mail" ? "M" : "F";
        const loginResult = await this.socialLogin({
          email,
          nickname,
          gender,
          platform: "kakao"
        });
        console.log(loginResult);
      } catch (err) {
        console.log(err);
      }
    },
    AuthLogout() {
      this.logout();
      // 카카오 로그인 버튼을 생성합니다.
    }
  }
};
</script>

<style>
#entireBox {
  opacity: 0.9;
}
.social-btn {
  outline: none;
}
</style>
