<template>
  <v-container id="signupSuccess">
        <v-row justify="center">
          <v-col cols="9" class="text-center">
            <span class="display-2 font-weight-thin">Study</span>
            <span class="display-2">PRO</span>
            <p class="mt-5">모임을 생성하려면 로그인이 필요합니다.<br>로그인해주세요.</p>
            <v-btn text class="mr-4" color="primary" @click="signinModal = true">로그인</v-btn>
          </v-col>
        </v-row>

      <signin-modal :signin-modal="signinModal" v-on:close="signinClose"/>
  </v-container>
</template>

<script>
export default {
  name: "signupSuccess",
  data: () => ({
    signinModal: false,
  }),
  components:{
    signinModal: () => import('@/components/user/SigninModal')
  },
  methods: {
    signinClose(){
      this.signinModal = false
    }
  },
  mounted(){
    if(this.$store.getters['auth/isAuth']){
      this.$router.push({name:'home'})
    }
  }
};
</script>
