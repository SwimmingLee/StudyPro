<template>
  <v-app id="app">
    <router-view name="header"/>
    <v-fade-transition>
      <router-view class="mainView"/>
    </v-fade-transition>
    <router-view name="footer"/>
  </v-app>
</template>

<script>
export default {
};
</script>
