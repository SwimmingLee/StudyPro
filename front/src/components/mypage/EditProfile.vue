<template>
  <v-form>
    <v-container>
      <div id="app">
        <v-app id="inspire">
          <v-form ref="form" v-model="valid">
            <v-row
              ><v-col cols="12" sm="12">
                <v-card class="mx-auto" max-width="1000">
                  <v-row justify="center" align="center"
                    ><v-col cols="12" sm="10">
                      <v-text-field
                        :disabled="true"
                        v-model="id"
                        :rules="idRules"
                        label="아이디"
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
                </v-card> </v-col
            ></v-row>

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

            <v-row
              ><v-col cols="12" sm="12">
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
                        >
                          수정하기
                        </v-btn>
                      </v-layout>
                    </v-flex></v-layout
                  ></v-card
                >
              </v-col></v-row
            >
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

    id: "dawnstar1007@naver.com",
    idRules: [
      v => !!v || "아이디를 입력해 주세요.",
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "ex) sample@example.com"
    ],
    introducing: "잘 부탁드려요!",
    introducingRules: [v => v.length <= 50 || "최대 50자까지 입력 가능합니다."],

    name: "윤찬희",
    nameRules: [v => v.length <= 50 || "이름이 너무 깁니다."],

    gender: ["남성", "여성"],

    nickname: "cyun",
    nicknameRules: [v => v.length <= 10 || "닉네임은 최대 10자입니다."],

    phone: "01012345678",
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

  methods: {
    validate() {
      if (
        (!this.name || this.name == "윤찬희") &&
        (!this.nickname || this.nickname == "cyun") &&
        (!this.phone || this.phone == "01012345678") &&
        (!this.introducing || this.introducing == "잘 부탁드려요!")
      ) {
        this.enablebtn = false;
      }
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword ||
        "비밀번호가 서로 일치하지 않습니다.";
    }
  },
  watch: {
    name() {
      if (this.name && this.name != "윤찬희") {
        this.enablebtn = true;
      } else {
        this.validate();
      }
    },
    nickname() {
      if (this.nickname && this.nickname != "cyun") {
        this.enablebtn = true;
      } else {
        this.validate();
      }
    },
    phone() {
      if (this.phone && this.phone != "01012345678") {
        this.enablebtn = true;
      } else {
        this.validate();
      }
    },
    introducing() {
      if (this.introducing && this.introducing != "잘 부탁드려요!") {
        this.enablebtn = true;
      } else {
        this.validate();
      }
    }
  }
};
</script>
