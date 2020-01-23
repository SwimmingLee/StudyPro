<template>
  <v-app id="app">
    <v-app id="view">
    <router-view name="header"/>
    <v-fade-transition>
      <router-view class="mainView fill-height"/>
    </v-fade-transition>
    <router-view name="footer"/>
    </v-app>
  </v-app>
</template>

<script>
export default {
};
</script>
