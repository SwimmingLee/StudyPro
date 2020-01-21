<template>
  <v-toolbar sylte="height=56px">
    <v-toolbar-title>
      <v-img src="@/assets/images/logo_brown.png" style="width:60px; height:50px"/>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text>Link One</v-btn>
      <v-btn text>Link Two</v-btn>
      <v-btn text>Link Three</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'appheader',
  data(){
    return {
      sidebar: false,
      menuItems: [
          { title: 'Home', path: '/home', icon: 'home' },
          { title: 'Board', path: '/board', icon: 'book' },
          { title: 'Search', path: '/search', icon: 'search' },
          { title: 'Sign Up', path: '/signup', icon: 'face' },
          { title: 'Sign In', path: '/signin', icon: 'lock_open' }
     ]
    }
  }
};
</script>

<style scoped>
#logo {
  width: 75px;
}
</style>