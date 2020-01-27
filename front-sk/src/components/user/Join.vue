<template>
  <v-form>
    <banner />
    <v-container>
      <div id="app">
        <v-app id="inspire">
          <v-form ref="form" v-model="valid">
            <v-card class="mx-auto" max-width="1000">
              <br />

              <v-row justify="center"
                ><v-col cols="12" sm="10">
                  <v-card-text style="font-size:30px">회원가입</v-card-text>
                </v-col></v-row
              >

              <v-row justify="center" align="center"
                ><v-col cols="12" sm="10">
                  <v-text-field
                    v-model="id"
                    :rules="idRules"
                    label="아이디"
                    required
                  ></v-text-field> </v-col
              ></v-row>

              <v-row justify="center" align="center"
                ><v-col cols="12" sm="10">
                  <v-text-field
                    label="비밀번호"
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
                    label="비밀번호 확인"
                    v-model="confirmPassword"
                    :rules="
                      confirmPasswordRules.concat(passwordConfirmationRule)
                    "
                    type="password"
                    required
                  ></v-text-field> </v-col
              ></v-row>

              <v-row justify="center" align="center"
                ><v-col cols="12" sm="10">
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="이름"
                    required
                  ></v-text-field> </v-col
              ></v-row>

              <v-row justify="center" align="center">
                <v-col cols="12" sm="10">
                  <v-select
                    :items="gender"
                    label="성별"
                    :rules="genderRules"
                    dense
                  ></v-select> </v-col
              ></v-row>

              <v-row justify="center" align="center"
                ><v-col cols="12" sm="10">
                  <v-text-field
                    v-model="nickname"
                    :counter="10"
                    :rules="nicknameRules"
                    label="닉네임"
                    required
                  ></v-text-field> </v-col
              ></v-row>

              <v-row justify="center" align="center"
                ><v-col cols="12" sm="10">
                  <v-text-field
                    v-model="phone"
                    :rules="phoneRules"
                    label="휴대전화 번호( - 제외하고 입력해 주세요.)"
                    required
                  ></v-text-field> </v-col
              ></v-row>

              <v-row justify="center" align="center"
                ><v-col cols="12" sm="10">
                  <v-text-field
                    v-model="introducing"
                    :counter="50"
                    :rules="introducingRules"
                    label="자신을 멋지게 소개해 주세요!"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>

            <v-row
              ><v-col cols="12" sm="12">
                <v-card class="px-5 mx-auto" max-width="1000">
                  <v-card-text class="pt-0" style="font-size:18px">
                    <p><br /></p>
                    관심있는 분야를 선택해 주세요.
                  </v-card-text>

                  <v-row justify="center" align="center">
                    <v-col cols="12" sm="3"
                      ><v-checkbox
                        v-model="db"
                        class="mx-2"
                        label="데이터베이스"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="12" sm="3"
                      ><v-checkbox
                        v-model="bc"
                        class="mx-2"
                        label="블록체인"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="12" sm="3"
                      ><v-checkbox
                        v-model="al"
                        class="mx-2"
                        label="알고리즘"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="12" sm="3"
                      ><v-checkbox
                        v-model="os"
                        class="mx-2"
                        label="운영체제"
                      ></v-checkbox
                    ></v-col>
                  </v-row>

                  <v-row justify="center" align="center">
                    <v-col cols="12" sm="3"
                      ><v-checkbox
                        v-model="ai"
                        class="mx-2"
                        label="인공지능"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="12" sm="3"
                      ><v-checkbox
                        v-model="ad"
                        class="mx-2"
                        label="자율주행"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="12" sm="3"
                      ><v-checkbox
                        v-model="cs"
                        class="mx-2"
                        label="컴퓨터보안"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="12" sm="3"
                      ><v-checkbox
                        v-model="cn"
                        class="mx-2"
                        label="컴퓨터통신"
                      ></v-checkbox
                    ></v-col>
                  </v-row>
                </v-card> </v-col
            ></v-row>

            <v-card
              class="mx-auto"
              max-width="1000"
              color="rgb(0, 0, 0, 0)"
              elevation="0"
            >
              <v-layout row>
                <v-flex column>
                  <v-layout justify-end>
                    <v-btn
                      class="mr-4"
                      :disabled="!valid"
                      color="success"
                      @click="validate"
                    >
                      가입하기
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
import { mapActions } from 'vuex'

export default {
  data: () => ({
    valid: true,

    id: "",
    idRules: [
      v => !!v || "아이디를 입력해 주세요.",
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "ex) sample@example.com"
    ],

    password: "",
    confirmPassword: "",
    passwordRules: [
      v => !!v || "비밀번호를 입력해 주세요.",
      v =>
        (v && v.length >= 8) ||
        "문자 / 숫자 혼용 8자리 이상으로 만들어 주세요.",
      v =>
        /(?=.*[a-zA-Z])/.test(v) ||
        "문자 / 숫자 혼용 8자리 이상으로 만들어 주세요.",
      v =>
        /(?=.*\d)/.test(v) || "문자 / 숫자 혼용 8자리 이상으로 만들어 주세요."
    ],
    confirmPasswordRules: [v => !!v || "비밀번호를 한 번 더 입력해 주세요."],
    introducing: "",
    introducingRules: [
      v => !!v || "하고싶은 말을 자유롭게 작성해 보세요!",
      v => (v && v.length <= 50) || "최대 50자까지 입력 가능합니다."
    ],

    name: "",
    nameRules: [
      v => !!v || "이름을 입력해 주세요.",
      v => (v && v.length <= 50) || "이름이 너무 깁니다."
    ],

    gender: ["남성", "여성"],
    genderRules: [v => !!v || "성별을 선택해 주세요."],

    nickname: "",
    nicknameRules: [
      v => !!v || "닉네임을 입력해 주세요.",
      v => (v && v.length <= 10) || "닉네임은 최대 10자입니다."
    ],

    phone: "",
    phoneRules: [
      v => !!v || "휴대전화 번호를 입력해 주세요.",
      v =>
        (v && v.length >= 10 && v.length <= 11) ||
        "전화번호 형식이 올바르지 않습니다.",
      v => /(?=.*\d)/.test(v) || "전화번호 형식이 올바르지 않습니다."
    ],

    ai: false,
    bc: false,
    al: false,
    ad: false,
    os: false,
    db: false,
    cn: false,
    cs: false,
    created: false
  }),
  components: {
    banner: () => import("@/components/home/Banner")
  },

  methods: {
    ...mapActions(['signup']),
    async onSignup () {
      try {
        let signupResult = await this.signup({name: this.name, nickname: this.nickname, email: this.email, password: this.password, gender: 'M', phone: this.phone})
        this.created = signupResult
        console.log(signupResult)
      } catch (err) {
        console.error(err)
      }
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword ||
        "비밀번호가 서로 일치하지 않습니다.";
    }
  }
};
</script>
