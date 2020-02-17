<template>
  <v-app id="app">
    <router-view name="header"/>
      <router-view class="mainView fill-height pt-8"/>
    <router-view name="footer" />
  </v-app>
</template>

<script>
import WbKakao from "@/social-signin/kakao/kakao";

export default {
  mounted(){
    window.scrollTo(0,0)
    this.$store.dispatch('auth/checkUserDefault')
    WbKakao.init()
  }
};
</script>
