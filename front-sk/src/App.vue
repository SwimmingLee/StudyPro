<template>
  <div id="app">
    <router-view name="header"/>
    <main>
      <v-fade-transition>
        <router-view/>
      </v-fade-transition>
    </main>
    <router-view name="footer"/>
  </div>
</template>

<script>
export default {
};
</script>
