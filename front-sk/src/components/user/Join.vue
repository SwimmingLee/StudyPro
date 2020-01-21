<template>
  <v-form>
    <v-container>
      <div id="app">
        <v-app id="inspire">
          <v-form ref="form" v-model="valid">
            <v-card-text style="font-size:30px">
              회원가입
            </v-card-text>

            <v-row
              ><v-col cols="12" sm="6">
                <v-text-field
                  v-model="name"
                  :counter="10"
                  :rules="nameRules"
                  label="이름"
                  required
                ></v-text-field> </v-col
            ></v-row>

            <v-row
              ><v-col cols="12" sm="6">
                <v-text-field
                  v-model="nickname"
                  :counter="10"
                  :rules="nicknameRules"
                  label="닉네임"
                  required
                ></v-text-field> </v-col
            ></v-row>

            <v-row
              ><v-col cols="12" sm="6">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="이메일 주소"
                  required
                ></v-text-field> </v-col
            ></v-row>

            <v-row
              ><v-col cols="12" sm="6">
                <v-text-field
                  v-model="phone"
                  :rules="phoneRules"
                  label="휴대전화 번호( - 제외하고 입력해 주세요.)"
                  required
                ></v-text-field> </v-col
            ></v-row>

            <v-row
              ><v-col cols="12" sm="6">
                <v-text-field
                  label="비밀번호"
                  v-model="password"
                  :rules="passwordRules"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="비밀번호 확인"
                  v-model="confirmPassword"
                  :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                  type="password"
                  required
                ></v-text-field> </v-col
            ></v-row>

            <v-row
              ><v-col cols="12" sm="12">
                <v-text-field
                  v-model="introducing"
                  :counter="100"
                  :rules="introducingRules"
                  label="자신을 멋지게 소개해 주세요!"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-card-text style="font-size:30px">
              관심있는 분야를 선택해 주세요.
            </v-card-text>

            <template>
              <v-container fluid>
                <p>{{ selected }}</p>
                <v-checkbox
                  v-model=selected
                  label=John
                  value=John
                ></v-checkbox>
                <v-checkbox
                  v-model=selected
                  label=Jacob
                  value=Jacob
                ></v-checkbox>
              </v-container>
            </template>

            <v-row>
              <v-col cols="12" sm="3">
                <v-checkbox
                  v-model="db"
                  class="mx-2"
                  label="데이터베이스"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="3">
                <v-checkbox
                  v-model="bc"
                  class="mx-2"
                  label="블록체인"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="3">
                <v-checkbox
                  v-model="al"
                  class="mx-2"
                  label="알고리즘"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="3">
                <v-checkbox
                  v-model="os"
                  class="mx-2"
                  label="운영체제"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="3">
                <v-checkbox
                  v-model="ai"
                  class="mx-2"
                  label="인공지능"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="3">
                <v-checkbox
                  v-model="ad"
                  class="mx-2"
                  label="자율주행"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="3">
                <v-checkbox
                  v-model="cs"
                  class="mx-2"
                  label="컴퓨터보안"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="3">
                <v-checkbox
                  v-model="cn"
                  class="mx-2"
                  label="컴퓨터통신"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-btn :disabled="!valid" color="success" @click="validate">
              가입하기
            </v-btn>

            <!-- <v-btn color="error" @click="reset">
                            초기화
                        </v-btn>
                        
                        <v-btn color="warning" @click="resetValidation">
                            Reset Validation
                        </v-btn> -->
          </v-form>

          <!-- <v-checkbox v-model="disabled" class="mx-2" label="Disabled"></v-checkbox>
                    <v-checkbox v-model="readonly" class="mx-2" label="Read-only"></v-checkbox>
                    <v-checkbox v-model="error" class="mx-2" label="Error"></v-checkbox>
                    <v-checkbox v-model="success" class="mx-2" label="Success"></v-checkbox> -->
        </v-app>
      </div>
    </v-container>
  </v-form>
</template>

<script>
export default {
 
  data: () => ({
    selected: [],

    valid: true,
    name: "",
    nameRules: [
      v => !!v || "이름을 입력해 주세요.",
      v => (v && v.length <= 10) || "이름은 최대 10자입니다."
    ],
    nickname: "",
    nicknameRules: [
      v => !!v || "닉네임을 입력해 주세요.",
      v => (v && v.length <= 10) || "닉네임은 최대 10자입니다."
    ],
    email: "",
    emailRules: [
      v => !!v || "이메일 주소를 입력해 주세요.",
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "이메일 주소 형식이 올바르지 않습니다."
    ],
    phone: "",
    phoneRules: [
      v => !!v || "휴대전화 번호를 입력해 주세요.",
      v =>
        (v && v.length >= 10 && v.length <= 11) ||
        "전화번호 형식이 올바르지 않습니다.",
      v => /(?=.*\d)/.test(v) || "전화번호 형식이 올바르지 않습니다."
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
      v => (v && v.length <= 100) || "최대 100자까지 입력 가능합니다."
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
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
    // reset() {
    //   this.$refs.form.reset();
    // },
    // resetValidation() {
    //   this.$refs.form.resetValidation();
    // }
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
