<template>
  <v-form >
    <v-container>
      <div id="app">
        <v-app id="inspire">
          <v-form ref="form" v-model="valid">
            <v-card class="mx-auto" max-width="1000">
              <br />

              <v-row justify="center" align="center"
                ><v-col cols="12" sm="10">
                  <v-text-field
                    label="현재 비밀번호"
                    v-model="curpassword"
                    :rules="curpasswordRules"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" align="center"
                ><v-col cols="12" sm="10">
                  <v-text-field
                    label="새 비밀번호"
                    v-model="password"
                    :rules="passwordRules"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" align="center">
                <v-col cols="12" sm="10">
                  <v-text-field
                    label="새 비밀번호 확인"
                    v-model="confirmPassword"
                    :rules="
                      confirmPasswordRules.concat(passwordConfirmationRule)
                    "
                    type="password"
                    required
                  ></v-text-field> </v-col
              ></v-row>
            </v-card>

            <v-card
              class="mx-auto"
              max-width="1000"
              color="rgb(0, 0, 0, 0)"
              elevation="0"
            >
              <v-layout row>
                <v-flex column class="mt-5">
                  <v-layout justify-end>
                    <v-btn
                      class="mr-4"
                      :disabled="!valid"
                      color="success"
                      @click="validate"
                    >
                      변경하기
                    </v-btn>
                  </v-layout>
                </v-flex></v-layout
              ></v-card
            >
          </v-form>
        </v-app>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    pwd: "qwerqwer1",
    valid: true,

    curpassword: "",
    password: "",
    confirmPassword: "",

    confirmPasswordRules: [v => !!v || "비밀번호를 한 번 더 입력해 주세요."]
  }),

  methods: {
    ...mapActions(["signup"]),
    async onSignup() {
      try {
        let signupResult = await this.signup({
          name: this.name,
          nickname: this.nickname,
          email: this.email,
          password: this.password,
          gender: "M",
          phone: this.phone
        });
        this.created = signupResult;
        console.log(signupResult);
      } catch (err) {
        console.error(err);
      }
    }
  },
  watch: {
    password() {
      this.confirmPassword = "";
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword ||
        "비밀번호가 서로 일치하지 않습니다.";
    }
  },
  mounted() {
    this.passwordRules = [
      v => !!v || "새 비밀번호를 입력해 주세요.",
      v =>
        (v && v.length >= 8) ||
        "문자 / 숫자 혼용 8자리 이상으로 만들어 주세요.",
      v =>
        /(?=.*[a-zA-Z])/.test(v) ||
        "문자 / 숫자 혼용 8자리 이상으로 만들어 주세요.",
      v =>
        /(?=.*\d)/.test(v) || "문자 / 숫자 혼용 8자리 이상으로 만들어 주세요.",
      v => (v && v !== this.pwd) || "기존 비밀번호와 동일합니다."
    ];
    this.curpasswordRules = [
      v => !!v || "현재 비밀번호를 입력해 주세요.",
      v => (v && v.length >= 8) || "비밀번호 형식이 올바르지 않습니다.",
      v => /(?=.*[a-zA-Z])/.test(v) || "비밀번호 형식이 올바르지 않습니다.",
      v => /(?=.*\d)/.test(v) || "비밀번호 형식이 올바르지 않습니다.",
      v => (v && v == this.pwd) || "비밀번호가 일치하지 않습니다."
    ];
  }
};
</script>
