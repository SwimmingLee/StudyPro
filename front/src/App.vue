<template>
  <v-app id="app">
    <router-view name="header" />
      <router-view class="mainView fill-height pt-8" />
    <router-view name="footer" />
  </v-app>
</template>

<script>
export default {
  mounted(){
    this.$store.dispatch('auth/checkUserDefault')
  }
};
</script>
