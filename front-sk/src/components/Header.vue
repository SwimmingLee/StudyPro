<template>
<div>
  <!-- <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->

    <v-toolbar app>
      <!-- <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span> -->
      <v-toolbar-title>
        <!-- <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link> -->
        <router-link to="/" tag="span" style="cursor: pointer">
          <img src="../assets/logo_brown.png" id="logo"/>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card
    color="grey lighten-4"
    flat
    height="200px"
    tile
  >
    <v-toolbar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</div>
</template>

<script>
export default {
  name: "App",
  data(){
    return {
      appTitle: 'Study Pro',
      sidebar: false,
      menuItems: [
          { title: 'Home', path: '/home', icon: 'home' },
          { title: 'Board', path: '/board', icon: 'book' },
          { title: 'Search', path: '/search', icon: 'search' },
          { title: 'Sign Up', path: '/signup', icon: 'face' },
          { title: 'Sign In', path: '/signin', icon: 'lock_open' }
     ]
    }
  },
};
</script>

<style scoped>
#logo {
  width: 75px;
}
</style>