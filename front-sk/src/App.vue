<template>
  <div id="app">
    <router-view name="header"/>
    <v-fade-transition>
      <router-view/>
    </v-fade-transition>
    <router-view name="footer"/>
  </div>
</template>

<script>
export default {
};
</script>
