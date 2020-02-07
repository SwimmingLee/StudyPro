<template>
  <v-content id="board">
    <v-row justify="center">
      <v-col cols="10">
        <v-card>
          <v-toolbar flat color="customTheme" dark>
            <v-toolbar-title class="ml-5">게시판</v-toolbar-title>
          </v-toolbar>
          <v-row no-gutters>
            <v-col style="max-width: 200px;">
              <v-card flat>
                <v-list flat>
                  <v-list-item-group>
                    <v-list-item
                      v-for="(menu, index) in menus"
                      :key="index"
                      @click="routeTo(menu.route)"
                    >
                      <v-list-item-icon>
                        <v-icon>{{ menu.icon }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{ menu.text }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
            <v-col>
              <v-card class="ma-2">
                <boardList :board="boardList">
                  <template v-slot:registerbtn v-if="!isAuth && isNotice">
                      <span></span>
                  </template>
                </boardList>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import boardList from "@/components/board/board_list";
// import postContent from "@/components/board/post_content";

export default {
  name: "board",
  data() {
    return {
      defaultRoute: "/board/",
      board_list: "study",
      menus: [
        { icon: "menu_book", text: "스터디 게시판", route: "study" },
        { icon: "style", text: "자유 게시판", route: "free" },
        { icon: "notifications_none", text: "공지사항", route: "notice" }
      ],
      isNotice: false,
    };
  },

  created() {
    if (this.$route.params.board) {
      this.board_list = this.$route.params.board;
    }
  },

  computed: {
    boardList: function() {
      return this.board_list;
    },

    isAdmin(){
      return this.$store.getters['auth/getUser'].isAdmin
    }
  },

  watch: {
    $route() {
      if (this.$route.params.board !== null) {
        this.board_list = this.$route.params.board;
      }
    }
  },

  methods: {
    routeTo(route) {
      if(route == 'notice'){
        this.isNotice = true
      }else{
        this.isNotice = false
      }
      this.$router.push({ name: "board", params: { board: route } });
    }
  },

  components: {
    boardList
    // postContent
  }
};
</script>
