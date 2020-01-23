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
        class="pa-1"
      >
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to bottom, rgba(255,255,255,1), rgba(0,0,0,.5)">
                  <v-layout
        fill-height
        align-center
        pa-3
        aria-hidden
      >
        <v-flex
          xs12
          md7
          offset-xs1
        >
          <h1 class="white--text display-3 font-weight-light">
            The Art Of Travel
          </h1>
          <div class="font-weight-light pl-1 mb-2"
               style="color:rgba(255,255,255,.8);">
            Finding Beauty, One flight at a time
          </div>
        </v-flex>
      </v-layout>
          </v-img>
        </template>

        <router-link to="/home" text-decoration="none">
          <v-toolbar-title>
            <v-icon large class="mr-2">fa-graduation-cap</v-icon>
            <span class="font-weight-light">Study</span>
            <span>PRO</span>
          </v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn href="/workspace" target="_blank" class="mt-1" text color="gray">
          <v-icon left>open_in_new</v-icon>
          <span>WorkSpace</span>
        </v-btn>
        <v-btn class="mt-1" @click="loginModal=true" text color="gray">
          <v-icon left>exit_to_app</v-icon>
          <span>Sign In</span>
        </v-btn>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <!-- Menu Tab -->
        <template v-slot:extension>
          <v-tabs
            align-with-title
            background-color="transparent"
            v-for="menu in menus"
            :key="menu.title"
          >
            <v-tab :to="menu.route" class="mx-auto">
              <v-icon left>{{ menu.icon }}</v-icon>
              {{ menu.title }}
            </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>

    <!-- Login Modal Boxs -->
    <v-dialog v-model="loginModal" max-width="600px">
      <v-card id="lgiModal" class="px-0 pt-0">
        <v-card-title class="customTheme darken-2 white--text pb-3">
          <span class="headline">Log In</span>
        </v-card-title>
        <v-card-text class="py-0 px-7">
          <v-container class="pb-0">
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field required type="email">
                  <template v-slot:label>
                    <strong>
                      <v-icon style="vertical-align: middle">email</v-icon>
                    </strong> E-mail
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field hint="비밀번호는 8자리 이상의 문자 + 숫자 조합입니다" required type="password">
                  <template v-slot:label>
                    <strong>
                      <v-icon style="vertical-align: middle">lock</v-icon>
                    </strong> Password
                  </template>
                </v-text-field>
              </v-col>
              <v-checkbox
                id="modalCheckbox"
                class="py-0 mb-0"
                v-model="checkbox"
                label="로그인 상태 유지"
                color="primary"
                value="primary"
                hide-details
              ></v-checkbox>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pt-0 pr-5">
          <v-spacer></v-spacer>
          <v-btn color="error lighten-1" tile @click="loginModal= false">창 닫기</v-btn>
          <v-btn color="customTheme darken-2 white--text" tile @click="loginModal= false">로그인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Navigation Bar -->
    <v-navigation-drawer app right v-model="drawer" color="rgba(100,100,100, .85">
      <div>
        <v-layout column transparent>
          <v-flex class="mt-2">
            <v-container>
              <v-icon large class="mr-3 white--text" @click="drawer = false">keyboard_arrow_right</v-icon>
              <router-link to="/home" text-decoration="none">
                <v-icon large class="mr-2">fa-graduation-cap</v-icon>
                <span class="logo font-weight-light">Study</span>
                <span class="logo ">PRO</span>
              </router-link>
            </v-container>
          </v-flex>
        </v-layout>
      </div>

      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="@/assets/articles/pigduck.jpg" alt />
          </v-avatar>
        </v-flex>
        <v-flex>
          <p class="white--text subheading mt-2">Kim Hyeon Cheol</p>
        </v-flex>
      </v-layout>

      <v-divider class="black ma-3"/>

      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.route">
          <v-list-item-icon>
            <v-icon class="pink--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="rgba(255,255,255,.6)">Log out</v-btn>
        </div>
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
      loginModal: false,
      checkbox: false,
      menus: [
        { icon: "home", title: "Main", route: "/home" },
        { icon: "group", title: "Study", route: "/study" },
        { icon: "alarm", title: "Board", route: "/board" }
      ],
      items: [
        { icon: "group", title: "My Study", route: "/study" },
        { icon: "calendar_today", title: "Calendar", route: "/calendar" },
        { icon: "account_circle", title: "Account", route: "/account" }
      ]
    };
  }
};
</script>

<style scoped>
.v-application a {
  color: gray;
  text-decoration: none;
}

.logo{
  font-size: 20px;
  color: rgba(255,255,255,.9);
}
</style>
