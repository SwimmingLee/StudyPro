<template>
  <v-container id="header">
    <v-app-bar fixed prominent max-height="56px" height="56px">
      <v-row style="height:56px; width:100%">
        <v-col cols="4" sm="3" md="2" class="py-0 pl-0" style="height:56px;">
          <router-link to="/home" text-decoration="none">
            <v-img
              src="@/assets/images/LogoText7.png"
              contain
              style="max-height:52px;"
            ></v-img>
          </router-link>
        </v-col>
        <!-- Menu Tab -->
        <v-col cols="1" sm="6" md="8" class="py-0">
          <template>
            <v-tabs
              background-color="transparent"
              class="d-none d-sm-flex justify-center"
              show-arrows
            >
              <v-tab :to="menu.route" v-for="menu in menus" :key="menu.title">
                <v-icon left>{{ menu.icon }}</v-icon>
                <span class="d-none d-lg-flex">{{ menu.title }}</span>
              </v-tab>
            </v-tabs>
          </template>
        </v-col>
        <v-col
          cols="7"
          sm="3"
          md="2"
          class="py-0 justify-end align-center"
          style="height:56px;"
        >
          <v-btn
            class="d-none d-sm-inline-block"
            @click="signinModal = true"
            v-if="!isAuth"
            text
          >
            <span>로그인</span>
          </v-btn>
          <v-btn
            class="black--text d-none d-sm-inline-block pt-2"
            to="/user/signup"
            elevation="0"
            text
            v-if="!isAuth"
          >
            <span>회원가입</span>
          </v-btn>
          <!-- 유저 이미지 -->
          <!-- <v-container class="align-right"> -->
          <!--  -->
          <template v-if="isAuth">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn text x-large class="pa-0" v-on="on">
                  <v-avatar size="30" class="mx-3">
                    <v-img :src="currentUser.profile_url"></v-img>
                  </v-avatar>
                  {{ currentUser.nickname }}
                  <v-icon class="mx-2">keyboard_arrow_down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(menu, index) in usermenuitems"
                  :key="index"
                  @click="clickUserMenu(menu.name)"
                >
                  <v-list-item-title>{{ menu.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <!-- </v-container> -->
          <!-- 유저 이미지 끝 -->
          <v-app-bar-nav-icon
            @click="drawer = true"
            class="d-flex d-sm-none"
          ></v-app-bar-nav-icon>
        </v-col>
      </v-row>
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
              <v-icon large class="white--text" @click="drawer = false"
                >keyboard_arrow_right</v-icon
              >
              <router-link class="ml-10" to="/home" text-decoration="none">
                <span class="logo white--text font-weight-light">Study</span>
                <span class="logo white--text">PRO</span>
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
            <v-list-item-title class="white--text">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- User Pages -->
      <v-container class="my-0 pa-0" v-if="isAuth">
        <v-divider class="white ma-5 mt-0" />
        <v-layout column align-center>
          <v-flex>
            <router-link to="/user/mypage">
              <v-avatar size="100" class="mb-3">
                <img :src="currentUser.profile_url" alt />
              </v-avatar>
            </router-link>
            <p align="center" class="white--text subheading">
              {{ currentUser.nickname }}
            </p>
          </v-flex>
        </v-layout>
        <v-list>
          <v-list-item>
            <v-list-item-content
              v-for="item in userpages"
              :key="item.title"
              :to="item.route"
            >
              <v-list-item-title class="white--text underlined">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
      <v-container v-else></v-container>
      <template v-slot:append>
        <v-card-actions class="justify-center" v-if="!isAuth">
          <v-btn text class="pink--text" @click="signinModal = true"
            >로그인</v-btn
          >
          <v-btn text class="pink--text transparent" elevation="0" to="/signup"
            >회원가입</v-btn
          >
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
      menus: [
        { icon: "home", title: "홈", route: "/home" },
        { icon: "group", title: "스터디", route: "/study/search" },
        { icon: "library_books", title: "게시판", route: "/board/share" },
        { icon: "date_range", title: "일정", route: "/calendar/mycal" },
        { icon: "accessibility_new", title: "내 정보", route: "/user/mypage" },
      ],
      navigations: [
        { title: "스터디 홈", route: "/home" },
        { title: "스터디", route: "/study/search" },
        { title: "게시판", route: "/board/share" },
        { title: "일정", route: "/calendar/mycal" },
        { title: "내 정보", route: "/user/mypage" }
      ],
      userpages: [
        { title: "정보 수정", route: "/user/mypage" },
        { title: "일정 관리", route: "/calendar/mycal" }
      ],
      usermenuitems: [
        { title: "정보수정", name: "info" },
        { title: "가입목록", name: "groups" },
        { title: "일정관리", name: "calendar" },
        { title: "로그아웃", name: "signout" }
      ],
      userInfo: {},
      isLoading: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/getUser"];
    },
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    }
  },
  components: {
    signinModal: () => import("@/components/user/SigninModal")
  },
  methods: {
    signinClose() {
      this.signinModal = false;
    },
    signout() {
      this.isLoading = true;
      this.$store.dispatch("auth/logout");
      this.isLoading = false;
      this.$router.push({ name: "home" });
    },
    clickUserMenu(name) {
      if (name == "info") {
        this.$router.push({ path: "/user/mypage" });
      } else if (name == "groups") {
        this.$router.push({ path: "/study/mygroups" });
      } else if (name == "calendar") {
        this.$router.push({ path: "/calendar/mycal" });
      } else if (name == "signout") {
        this.signout();
      }
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
.usermenu {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.7) !important;
}
.usermenubtn {
  width: 100%;
  justify-content: start;
}
.dropPanel {
  margin-top: 150px;
}
</style>
