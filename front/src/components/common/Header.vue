<template>
  <v-container>
    <!-- Header Menu -->
    <v-app-bar
      app
      fixed
      shrink-on-scroll
      prominent
      src="@/assets/images/HeaderBackground.jpg"
      fade-img-on-scroll
      scroll-threshold="100"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top, rgba(255,255,255,1), rgba(0,0,0,.5)"
        >
          <v-layout fill-height align-center aria-hidden>
            <v-flex xs12 md7 offset-xs1>
              <h1 class="display-3 headerText mb-4">
                Header
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
        <span>로그인</span>
      </v-btn>
      <v-btn
        class="mt-1 black--text d-none d-sm-flex transparent"
        to="/user/signup"
        elevation="0"
        text
        v-if="!isAuth"
      >
        <span>회원가입</span>
      </v-btn>

      <!-- 유저 이미지 -->
      <!-- <v-container class="align-right"> -->
      <template v-else>
        <a 
          @click="usermenu = !usermenu, usermenuactive = !usermenuactive"
          :class="{ usermenuactive }" class="userPanel">
          <v-avatar>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          <span class="mr-2 grey--text" >{{currentUser.nickname}}</span> 
          <svg viewBox="0 0 451.847 451.847" width="12"><path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
		c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
		c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z" fill="rgba(200,200,200,.7)"/></svg>
          <div :class="{ usermenu }" class="userdropdown">
            <ul class="pl-0">
              <li v-for="item in usermenuitems" :key="item.title">
                <v-btn text @click="clickUserMenu(item.name)" class="usermenubtn">
                  <span class="usermenu">{{ item.title }}</span>
                </v-btn>
              </li>
            </ul>
          </div>
        </a>
      </template>
      <!-- </v-container> -->
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
          <hr
        />
        <v-layout column align-center>
          <v-flex>
            <router-link to="/mypage">
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
          <v-btn text class="pink--text" @click="signinModal=true">로그인</v-btn>
          <v-btn text class="pink--text transparent" elevation="0" to="/signup">회원가입</v-btn>
        </v-card-actions>
        <v-card-actions class="justify-center" v-else>
          <v-btn text class="pink--text" @click="signout">로그아웃</v-btn>
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
      usermenu: false,
      usermenuactive: false,
      menus: [
        { icon: "home", title: "홈", route: "/home" },
        { icon: "group", title: "모임", route: "/study" },
        { icon: "alarm", title: "게시판", route: "/board" },
        { icon: "accessibility_new", title: "내 정보", route: this.$store.state.auth.user? "/user/mypage": "/user/signup" }
      ],
      navigations: [
        { title: "홈", route: "/home" },
        { title: "모임", route: "/study" },
        { title: "게시판", route: "/board" },
        { title: "내 정보", route: "/user" }
      ],
      userpages: [
        { title: "정보수정", route: "/myinfo" },
        { title: "가입목록", route: "/mygroups" },
        { title: "일정관리", route: "/mycalendar" }
      ],
      usermenuitems: [
        { title: "정보수정", name: "info"},
        { title: "가입목록", name: "groups"},
        { title: "일정관리", name: "calendar"},
        { title: "로그아웃", name: "signout"}
      ],
      userInfo: {},
    };
  },
  computed: {
    currentUser(){
      return this.$store.state.auth.user
    },
    isAuth(){
      return this.$store.getters['auth/isAuth']
    }
  },
  components: {
    signinModal: () => import("@/components/user/SigninModal")
  },
  methods: {
    signinClose() {
      this.signinModal = false;
    },
    signout(){
      this.$store.dispatch('auth/logout')
    },
    clickUserMenu(name){
      if(name == 'info'){
        this.$router.push({path: '/user/mypage'})
      }else if(name == 'groups'){
        this.$router.push({path: '/user/groups'})
      }else if(name == 'calendar'){
        this.$router.push({path: '/user/calendar'})
      }else if(name == 'signout'){
        this.signout();
        location.reload();
      }
    }
  },
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

.usermenu {
  font-size: 13px;
  color: rgba(0,0,0,.7) !important;
}
.usermenubtn{
  width: 100%;
  justify-content: start;
}
</style>
