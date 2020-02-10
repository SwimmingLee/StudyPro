<template>
  <v-content app id="search">
    <v-row class="fill-height" justify="center">
      <v-col cols="12" sm="10">
        <v-card min-height="90%" class="mx-1">
          <v-toolbar flat color="customTheme" dark>
            <v-toolbar-title class="ml-5">{{ getTitle }}</v-toolbar-title>
          </v-toolbar>
          <v-tabs vertical class="pl-3 pt-3" v-model="tabIndex">
            <v-tab class="py-3 justify-start" v-for="item in titles" :key="item.title">
              <v-icon left>{{item.icon}}</v-icon>
              <span class="d-none d-sm-flex">{{item.title}}</span>
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <study-search />
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <group-list />
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <create-group v-if="isAuth" v-on:moveGroups="moveGroups" />
                <request-signin v-else>
                  <template v-slot:title>
                    <p>
                      모임을 생성하려면 로그인이 필요합니다.<br />로그인해주세요.
                    </p>
                  </template>
                </request-signin>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "search",
  data: () => ({
    tabIndex: 0,
    titles: [
      {
        icon: "mdi-magnify",
        title: "스터디검색"
      },
      {
        icon: "list",
        title: "가입스터디 목록"
      },
      {
        icon: "mdi-book-open-variant",
        title: "스터디생성"
      }
    ]
  }),
  components: {
    studySearch: () => import("@/components/study/Search"),
    createGroup: () => import("@/components/study/CreateGroup"),
    groupList: () => import("@/components/user/MyGroupList"),
    requestSignin: () => import("@/components/base/RequestSignin")
  },
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    },

    getTitle() {
      return this.titles[this.tabIndex].title;
    }
  },
  methods: {
    moveGroups() {
      window.scrollTo(0, 0);
      this.tabIndex = 1;
    }
  }
};
</script>
