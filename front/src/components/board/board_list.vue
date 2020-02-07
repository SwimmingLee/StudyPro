<template>
  <v-container flex>
    <v-flex class="ma-2">
      <v-icon large class="mr-2" color="black">menu_book</v-icon>스터디 게시판
      <slot name="registerbtn">
        <v-btn
          style="float: right;"
          to="/board/register"
          class="mx-1 green white--text"
        >
          <v-icon class="mr-3" dark>create</v-icon>글 작성
        </v-btn>
      </slot>
    </v-flex>
    <v-divider class="mx-3 mt-5" />
    <v-row>
      <v-col>
        <router-view class="pa-0" />
      </v-col>
    </v-row>
    <v-divider class="mx-3 mb-3" />
    <v-row justify="center">
      <v-col>
        <v-card outlined class="px-3 py-2 mx-3" elevation="3">
          <v-row>
            <v-col align="center" cols="1" class="pa-1 px-3">No.</v-col>
            <v-divider class="my-2" vertical />
            <v-col cols="6" class="pa-2 pl-5">제목</v-col>
            <v-spacer />
            <v-divider class="my-2" vertical />
            <v-col align="center" cols="2" class="pa-2 px-3">작성자</v-col>
            <v-col align="center" cols="1" class="pa-2 px-3">조회</v-col>
            <v-col align="center" cols="1" class="pa-2 px-3">추천</v-col>
          </v-row>
          <v-divider class="ma-2" />

          <v-card
            flat
            v-for="(post, index) in post_list"
            :key="index"
            @click="routeTo(post.id)"
          >
            <!-- <v-card  v-for="(post, index) in postList" :key="index"> -->
            <v-row>
              <v-col align="center" cols="1" class="pa-2 px-3">{{
                post.id
              }}</v-col>
              <v-divider class="my-2" vertical />
              <v-col cols="6" class="pa-2 pl-5">{{ post.title }}</v-col>
              <v-spacer />

              <v-divider class="my-2" vertical />
              <v-col align="center" cols="2" class="pa-2 px-3">{{
                post.writer
              }}</v-col>
              <v-col align="center" cols="1" class="pa-2 px-3">{{
                post.view
              }}</v-col>
              <v-col align="center" cols="1" class="pa-2 px-3">0</v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="ma-3" />

    <v-row justify="center" class="my-3 mx-1">
      <v-col>
        <v-pagination
          v-model="page"
          :length="lastpage"
          :total-visible="10"
        ></v-pagination>
        <slot name="registerbtn">
          <v-btn
            style="float: right;"
            to="/board/register"
            class="mx-1 green white--text"
          >
            <v-icon class="mr-3" dark>create</v-icon>글 작성
          </v-btn>
        </slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostService from "@/services/post.service";

export default {
  props: ["board"],
  data() {
    return {
      board_name: "study",

      page: 1,
      lastpage: 1,
      post_number: 0,
      post_list: [],
      notice: false
    };
  },

  created() {
    this.postUpdate();
    this.board_name = this.board;
  },
  watch: {
    page() {
      this.postUpdate();
    },
    board() {
      this.board_name = this.board;
    },
    board_name() {
      this.postUpdate();
    }
  },
  computed: {
    postList: function() {
      return this.post_list;
    }
  },
  methods: {
    async postUpdate() {
      const post_num = await PostService.getPostNumber({
        type: "study",
        board: this.board_name,
        study_id: 8
      });
      this.lastpage =
        parseInt(post_num.data.post_number / 10) +
        (post_num.data.post_number % 10 === 0 ? 0 : 1);

      const post_list = await PostService.getAllPost({
        type: "study",
        board: this.board_name,
        study_id: 8,
        offset: (this.page - 1) * 10
      });
      this.post_list = post_list.data;
    },
    routeTo(post_id) {
      this.$router.push({
        name: "post_id",
        params: { post_id: post_id }
      });
    }
  }
};
</script>

<style scoped></style>
