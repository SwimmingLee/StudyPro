<template>
  <v-app>
    <router-view name="header"/>
    <v-fade-transition>
      <router-view/>
    </v-fade-transition>
    <router-view name="footer"/>
  </v-app>
</template>

<script>
export default {
};
</script>
