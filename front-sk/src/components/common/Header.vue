<template>
  <nav>
    <v-toolbar text>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-btn text to="/home" color="none">
          <span class="font-weight-light">Study</span>
          <span>PRO</span>
        </v-btn>
      </v-toolbar-title>

        <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text color="gray" v-on="on">
            <v-icon>expand_more</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <!-- <v-list-item v-for="link in links" :key="link.text" @click="routeTo(link.route)"> -->
          <v-list-item v-for="link in links" :key="link.text" :to="link.route">
            <v-icon left>{{ link.icon }}</v-icon>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn @click="loginModal=true" text color="gray">
        <v-icon left>exit_to_app</v-icon>
        <span>Sign In</span>
      </v-btn>

      <!-- loginModal -->
      <v-dialog v-model="loginModal" max-width="600px">
        <v-card id="lgiModal" class="px-0 pt-0">
          <v-card-title class="customTheme darken-2 white--text pb-3">
            <span class="headline">Log In</span>
          </v-card-title>
          <v-card-text class="py-0 px-7">
            <v-container class="pb-0">
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-icon left>email</v-icon>
                  <v-text-field label="E-mail" required type="email"></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    hint="비밀번호는 8자리 이상의 문자 + 숫자 조합입니다"
                    label="Password"
                    required
                    type="password"
                  ></v-text-field>
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
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="customTheme lighten-1">
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "appHeader",
  data() {
    return {
      drawer: false,
      loginModal: false,
      checkbox: false,
      links: [
        { icon: "dashboard", text: "DashBoard", route: "/" },
        { icon: "folder", text: "My Projects", route: "/a" },
        { icon: "person", text: "Team", route: "/b" }
      ]
    };
  }
};
</script>
