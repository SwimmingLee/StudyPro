<template>
  <v-container id="requestsignin">
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <span class="display-2 font-weight-thin">Study</span>
        <span class="display-2">PRO</span>
      </v-col>
      <v-row>
        <v-col cols="12" class="text-center">
          <slot name="text"></slot>
          <v-btn text class="mr-4" color="primary" @click="signinModal = true"
            >로그인</v-btn
          >
          <v-btn text class="mr-4" color="green lighten-2" @click="moveSignup"
            >회원가입</v-btn
          >
        </v-col>
      </v-row>
    </v-row>

    <signin-modal :signin-modal="signinModal" v-on:close="signinClose" />
  </v-container>
</template>

<script>
export default {
  name: "requestsignin",
  data: () => ({
    signinModal: false
  }),
  components: {
    signinModal: () => import("@/components/user/SigninModal")
  },
  methods: {
    signinClose() {
      this.signinModal = false;
    },
    moveSignup(){
      this.$router.push({path:'signup'})
    }
  },
  mounted() {
    if (this.$store.getters["auth/isAuth"]) {
      this.$router.push({ name: "home" });
    }
  }
};
</script>
