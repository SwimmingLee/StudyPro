<template>
  <v-content app id="studymain">
    <v-row justify="center">
      <v-col cols="12" md="11" lg="10">
        <v-card class="mx-1">
          <v-toolbar flat color="customTheme" dark>
            <v-toolbar-title class="ml-5">{{ getTitle }}</v-toolbar-title>
          </v-toolbar>
          <v-tabs vertical class="pl-3 pt-3" v-model="tabIndex">
            <v-tab
              class="py-3 justify-start"
              v-for="item in titles"
              :key="item.title"
            >
              <v-icon left>{{ item.icon }}</v-icon>
              <span class="d-none d-sm-flex">{{ item.title }}</span>
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <study-search />
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <group-list v-if="isAuth"/>
                <request-signin v-else>
                  <template v-slot:text>
                    <p>
                      로그인해주세요.
                    </p>
                  </template>
                </request-signin>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <div v-if="created === 0">
                <create-group v-if="isAuth" v-on:success="success"/>
                <request-signin v-else>
                  <template v-slot:text>
                    <p>
                      모임을 생성하려면 로그인이 필요합니다.<br />로그인해주세요.
                    </p>
                  </template>
                </request-signin>
              </div>
              <create-success
                v-else
                :id="created"
                v-on:movegroups="moveGroups"
              />
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "studymain",
  data: () => ({
    tabIndex: 0,
    titles: [
      {
        icon: "mdi-magnify",
        title: "스터디 검색"
      },
      {
        icon: "list",
        title: "내 스터디 보기"
      },
      {
        icon: "mdi-book-open-variant",
        title: "스터디 생성"
      }
    ],
    created: 0,
  }),
  watch: {
    tabIndex() {
      if (this.tabIndex == 2) {
        this.created = 0;
      }
    },
  },
  components: {
    studySearch: () => import("@/components/study/Search"),
    createGroup: () => import("@/components/study/CreateGroup"),
    groupList: () => import("@/components/user/MyGroupList"),
    requestSignin: () => import("@/components/base/RequestSignin"),
    createSuccess: () => import('@/components/study/CreateSuccess')
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
      this.tabIndex = 1;
    },
    success(gid){
      this.created = gid
    }
  },
  mounted(){
    if(this.$route.path.split('/')[2] == 'mygroups'){
      this.tabIndex = 1
    }
  }
};
</script>
