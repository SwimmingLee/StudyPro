<template>
  <v-app id="app">
    <router-view name="header" />
    <v-fade-transition>
      <router-view class="mainView fill-height" />
    </v-fade-transition>
    <router-view name="footer" />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import WbKakao from "@/social-signin/kakao/kakao";

export default {
  methods: {
    ...mapActions(['checkToken']),
  },
  async mounted() {
    let accessToken = await localStorage.getItem("accessToken");
    if (!accessToken) {
      accessToken = await sessionStorage.getItem("accessToken");
    }

    this.checkToken({token:accessToken});
    WbKakao.init();
  }
};
</script>
