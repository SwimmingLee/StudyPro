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
              <v-text-field
                required
                :rules="passwordRules"
                type="password"
                v-model="password"
              >
                <template v-slot:label>
                  <strong>
                    <v-icon style="vertical-align: middle">lock</v-icon>
                  </strong>
                  Password
                </template>
              </v-text-field>
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
        <v-btn
          color="error--text lighten-1 transparent"
          @click="close"
          elevation="0"
          >Close</v-btn
        >
        <v-btn color="transparent" @click="signin" elevation="0">Sign in</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    signinRemain: false,
    open: false,
    idRules: [v => !!v || "아이디를 입력해 주세요."],
    passwordRules: [v => !!v || "비밀번호를 입력해 주세요."],
    id: "",
    password: ""
  }),
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
  methods: {
    close() {
      this.$emit("close");
    },
    signin(){

    }
  }
};
</script>

<style>
#entireBox {
  opacity: 0.9;
}
</style>
