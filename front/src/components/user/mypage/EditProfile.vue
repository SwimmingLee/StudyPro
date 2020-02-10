<template>
  <v-form>
    <v-container>
      <div id="app">
        <v-app id="inspire">
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12" sm="12">
                <v-card class="mx-auto" max-width="1000">
                  <v-row justify="center" align="center">
                    <v-col cols="12" sm="10">
                      <v-text-field
                        :disabled="true"
                        v-model="input.email"
                        :rules="idRules"
                        label="아이디"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row justify="center" align="center">
                    <v-col cols="12" sm="10">
                      <v-text-field
                        v-model="input.name"
                        :rules="nameRules"
                        label="이름"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row justify="center" align="center">
                    <v-col cols="12" sm="10">
                      <v-select
                        v-model="input.gender"
                        :items="genderItems"
                        label="성별"
                        dense
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-row justify="center" align="center">
                    <v-col cols="12" sm="10">
                      <v-text-field
                        v-model="input.nickname"
                        :counter="10"
                        :rules="nicknameRules"
                        label="닉네임"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row justify="center" align="center">
                    <v-col cols="12" sm="10">
                      <v-text-field
                        v-model="input.phone"
                        :rules="phoneRules"
                        label="휴대전화 번호( - 제외하고 입력해 주세요.)"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row justify="center" align="center">
                    <v-col cols="12" sm="10">
                      <v-textarea
                        v-model="input.introducing"
                        :counter="50"
                        :rules="introducingRules"
                        label="자신을 멋지게 소개해 주세요!"
                        required
                        outlined
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <image-input v-model="input.profile_url" class="wrap-content">
                      <div slot="activator" class="wrap-content pointer">
                        <v-avatar size="150px" v-ripple class="mb-3">
                          <img :src="input.profile_url" alt="Error" />
                        </v-avatar>
                      </div>
                    </image-input>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12">
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
                          :disabled="!enablebtn || !valid"
                          color="success"
                          @click="validate"
                          >수정하기</v-btn
                        >
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </v-app>
      </div>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    enablebtn: false,
    valid: true,
    user: null,

    input: {
      id: "",
      email: "",
      name: "",
      gender: "",
      nickname: "",
      phone: "",
      introducing: "",
      profile_url: "",
      platform_type: ""
    },

    idRules: [
      v => !!v || "아이디를 입력해 주세요.",
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "ex) sample@example.com"
    ],
    introducingRules: [
      v => !v || v.length <= 50 || "최대 50자까지 입력 가능합니다."
    ],
    nameRules: [v => !v || v.length <= 50 || "이름이 너무 깁니다."],
    genderItems: ["남성", "여성"],
    nicknameRules: [v => !v || v.length <= 10 || "닉네임은 최대 10자입니다."],
    phoneRules: [
      v =>
        (v && v.length >= 10 && v.length <= 11) ||
        "전화번호 형식이 올바르지 않습니다.",
      v =>
        !/(?=.*[a-zA-Z!@#$%^&*()_+=-?/'";{}])/.test(v) ||
        "전화번호 형식이 올바르지 않습니다."
    ],

    ai: false,
    bc: false,
    al: false,
    ad: false,
    os: false,
    db: false,
    cn: false,
    cs: false
  }),

  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword ||
        "비밀번호가 서로 일치하지 않습니다.";
    },
    userNickname: function() {
      return this.$store.getters.userNickname;
    },
    userEmail: function() {
      return this.$store.getters.userEmail;
    },
    userName: function() {
      return this.$store.getters.userName;
    },
    userPhone: function() {
      return this.$store.getters.userPhone;
    }
  },

  async mounted() {
    var uid = this.$store.getters["auth/getUser"].uid;
    var user = await this.$store.dispatch("getUserContent", uid);
    console.log(user);
    this.input = {
      id: uid,
      email: user.email,
      name: user.name,
      gender: user.gender,
      nickname: user.nickname,
      phone: user.phone,
      introducing: "",
      profile_url: user.profile_url,
      platform_type: user.platform_type
    };

    this.user = user;
  },

  methods: {
    validate() {
      if (
        (!this.input.name || this.input.name == this.user.name) &&
        (!this.input.nickname ||
          (this.nickname == this.user.nickname &&
            (!this.input.phone || this.phone == this.user.phone)))
      ) {
        this.enablebtn = false;
      }
    }
  },

  watch: {
    name() {
      if (this.input.name && this.input.name != this.user.name) {
        this.enablebtn = true;
      } else {
        this.validate();
      }
    },
    nickname() {
      if (this.input.nickname && this.input.nickname != this.user.nickname) {
        this.enablebtn = true;
      } else {
        this.validate();
      }
    },
    phone() {
      if (this.input.phone && this.input.phone != this.user.phone) {
        this.enablebtn = true;
      } else {
        this.validate();
      }
    },
    introducing() {
      // if (this.introducing && this.introducing != "잘 부탁드려요!") {
      //   this.enablebtn = true;
      // } else {
      //   this.validate();
      // }
    }
  }
};
</script>
