<template>
  <v-content id="study" class="pa-0">
    <v-navigation-drawer absolute permanent expand-on-hover v-if="isAuth">
      <v-list>
        <v-list-item class>
          <v-list-item-avatar>
            <v-img :src="currentUser.profile_url"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>{{ currentUser.nickname }}</v-list-item-title>
        </v-list-item>
        <v-divider class="ma-3 mb-0" />
        <v-list-item
          v-for="(menu, index) in menus"
          :key="index"
          @click="routeTo(menu.route)"
        >
          <v-list-item-icon>
            <v-icon medium>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="toWorkspace">
          <v-list-item-icon>
            <v-icon medium>developer_board</v-icon>
          </v-list-item-icon>
          <v-list-item-title>WorkSpace</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider class="mx-3" />
      <v-list>
        <v-list-item @click="routeTo()">
          <v-list-item-icon>
            <v-icon medium>check</v-icon>
          </v-list-item-icon>
          <v-list-item-title>출석체크</v-list-item-title>
        </v-list-item>
        <v-list-item @click="routeTo()">
          <v-list-item-icon>
            <v-icon medium>settings</v-icon>
          </v-list-item-icon>
          <v-list-item-title>관리자 메뉴</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-card flat>
      <v-img src="@/assets/images/cherryblossom.jpg" aspect-ratio="7"></v-img>
      <v-row no-gutters justify="center">
        <v-col offset="1" cols="11" class="mr-7 mt-5">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-card>
  </v-content>
</template>

<script>
export default {
  props: ["study_id"],
  data() {
    return {
      menus: [
        {
          icon: "home",
          title: "홈으로",
          route: {
            routes: "study_home",
            params: { study_id: this.study_id }
          }
        },
        {
          icon: "date_range",
          title: "일정 관리",
          route: {
            routes: "study_schedule"
          }
        },
        {
          icon: "library_books",
          title: "게시판",
          route: {
            routes: "study_board",
            params: { board_name: "study" }
          }
        },
        {
          icon: "group",
          title: "스터디 멤버",
          route: {
            routes: "study_member"
          }
        }
      ]
    };
  },

  created() {
    window.closechild = () => {
      this.workspace.close();
    };
  },

  mounted() {
    if (!this.isAuth) {
      this.$router.push({ name: "home" });
    }
  },

  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    },
    currentUser() {
      return this.$store.getters["auth/getUser"];
    }
  },

  methods: {
    routeTo(route) {
      this.$router.push({ name: route.routes, params: route.params });
    },
    toWorkspace() {
      let workspace = this.$router.resolve({
        name: "workspace",
        params: { study_id: this.study_id }
      });
      this.workspace = window.open(workspace.href, "WORKSPACE", "a");
    }
  }
};
</script>
