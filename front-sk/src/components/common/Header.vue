<template>
  <v-container>
    <!-- Header Menu -->
    <v-app-bar
      app
      fixed
      shrink-on-scroll
      prominent
      src="@/assets/images/IntroBackground.jpg"
      fade-img-on-scroll
      scroll-threshold="200"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top, rgba(255,255,255,1), rgba(0,0,0,.5)"
        >
          <v-layout fill-height align-center aria-hidden>
            <v-flex xs12 md7 offset-xs1>
              <h1 class="display-3 headerText mb-4">
                The Art Of Travel
              </h1>
            </v-flex>
          </v-layout>
        </v-img>
      </template>

      <router-link to="/home" text-decoration="none">
        <v-toolbar-title>
          <v-icon large class="mr-2" color="black">fa-graduation-cap</v-icon>
          <span class="black--text font-weight-light">Study</span>
          <span class="black--text">PRO</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <!-- <v-btn href="/workspace" target="_blank" class="mt-1" text color="gray">
          <v-icon left>open_in_new</v-icon>
          <span>WorkSpace</span>
        </v-btn> -->
      <v-btn
        class="mt-1 d-none d-sm-flex"
        @click="signinModal = true"
        v-if="!isAuth"
        text
      >
        <span>Sign In</span>
      </v-btn>
      <v-btn
        class="mt-1 black--text d-none d-sm-flex transparent"
        to="/signup"
        elevation="0"
        text
        v-if="!isAuth"
      >
        <span>Sign Up</span>
      </v-btn>

      <!-- 유저 이미지 -->
      <!-- <v-expansion-panels v-else>
        <v-expansion-panel>
          <v-expansion-panel-header class="pa-0"> -->
            <v-avatar class="">
              <v-icon class="">mdi-account-circle</v-icon>
            </v-avatar>
            <span>[nickname]</span>
          <!-- </v-expansion-panel-header>
        </v-expansion-panel>
      </v-expansion-panels> -->
      <!-- 유저 이미지 끝 -->

      <v-app-bar-nav-icon @click="drawer = true"
        class="d-block d-sm-none"></v-app-bar-nav-icon>

      <!-- Menu Tab -->
      <template v-slot:extension>
        <v-tabs
          background-color="transparent"
          class="d-none d-sm-block"
        >
          <v-tab :to="menu.route"
            class="mx-auto"
            v-for="menu in menus"
            :key="menu.title">
            <v-icon left>{{ menu.icon }}</v-icon>
            {{ menu.title }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <!-- Signin Modal Boxs -->
    <signin-modal :signinModal="signinModal" v-on:close="signinClose" />

    <!-- Navigation Bar -->
    <v-navigation-drawer
      app
      right
      v-model="drawer"
      color="black"
      disable-resize-watcher
      id="navDrawer"
    >
      <div>
        <v-layout column transparent>
          <v-flex class="mt-2">
            <v-container>
              <v-icon large class=" white--text" @click="drawer = false"
                >keyboard_arrow_right</v-icon
              >
              <router-link class="ml-10" to="/home" text-decoration="none">
                <span class="logo white--text font-weight-light">Study</span>
                <span class="logo white--text ">PRO</span>
              </router-link>
            </v-container>
          </v-flex>
        </v-layout>
      </div>

      <v-divider class="black ma-1" />

      <!-- Navigations -->
      <v-list>
        <v-content text disabled class="grey--text text-center mx-4 pa-0"
          >Navigations
          <hr
        /></v-content>
        <v-list-item
          v-for="item in navigations"
          :key="item.title"
          :to="item.route"
        >
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- User Pages -->
      <v-container class="my-0 pa-0" v-if="isAuth">
        <v-content text disabled class="grey--text text-center mx-4 mb-4 pa-0"
          >User Pages
          <hr
        /></v-content>
        <v-layout column align-center>
          <v-flex>
            <router-link to="/myinfo">
              <v-avatar size="42">
                <img src="@/assets/articles/pigduck.jpg" alt />
              </v-avatar>
              <span class="white--text ml-2" text-decoration="none"
                >Kim Hyeon Cheol</span
              >
            </router-link>
          </v-flex>
          <v-flex> </v-flex>
        </v-layout>
        <v-list>
          <v-list-item>
            <v-list-item-content
              v-for="item in userpages"
              :key="item.title"
              :to="item.route">
              <v-list-item-title class="white--text underlined">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
      <v-container v-else>
      </v-container>
      <template v-slot:append>
        <v-card-actions class="justify-center" v-if="!isAuth">
          <v-btn text class="pink--text" @click="signinModal=true">Sign in</v-btn>
          <v-btn text class="pink--text transparent" elevation="0" to="/signup">Sign up</v-btn>
        </v-card-actions>
        <v-card-actions class="justify-center" v-else>
          <v-btn text class="pink--text" >Sign out</v-btn>
        </v-card-actions>
      </template>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: "appHeader",
  data() {
    return {
      drawer: false,
      signinModal: false,
      checkbox: false,
      menus: [
        { icon: "home", title: "Home", route: "/home" },
        { icon: "group", title: "Study", route: "/study" },
        { icon: "alarm", title: "Board", route: "/board" }
      ],
      navigations: [
        { title: "Home", route: "/home" },
        { title: "StudySearch", route: "/study" },
        { title: "Board", route: "/board" }
      ],
      userpages: [
        { title: "Information", route: "/myinfo" },
        { title: "Study Groups", route: "/mygroups" },
        { title: "Calendar", route: "/mycalendar" }
      ]
    };
  },
  computed: {
    isAuth: function() {
      return this.$store.getters.isAuth;
    },
  },
  components: {
    signinModal: () => import("@/components/user/SigninModal")
  },
  methods: {
    signinClose() {
      this.signinModal = false;
    }
  }
};
</script>

<style scoped>
.v-application a {
  color: gray;
  text-decoration: none;
}

.logo {
  font-size: 20px;
}

.headerText {
  color: rgba(255, 255, 255, 0.7);
}

#navDrawer {
  opacity: 0.8;
}

.userPanel {
  display: flex;
  flex-wrap: wrap;
}
</style>
