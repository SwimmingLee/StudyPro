<template>
  <v-content>
    <v-card class="mx-3 pa-3">
      <v-card flat class="pa-3 mb-5">
        <v-row no-gutters>
          <v-col style="max-width: 50px;">제목 :</v-col>
          <v-col>{{ this.post_contents.title }}</v-col>
        </v-row>

        <v-divider class="my-2" />
        <v-row no-gutters>
          <v-col style="max-width: 60px;">작성자 :</v-col>
          <v-col>{{this.post_contents.writer}}</v-col>
          <v-col style="max-width: 45px;">조회 :</v-col>
          <v-col style="max-width: 40px;">{{this.post_contents.view}}</v-col>
          <v-col style="max-width: 45px;">추천 :</v-col>
          <v-col style="max-width: 30px;">0</v-col>
        </v-row>
      </v-card>

      <v-row no-gutters class="mb-3">
        <v-col cols="12">
          <v-card outlined class="pa-3">
            <span v-html="this.post_contents.content"></span>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="text-center ma-2">
          <v-btn class="mx-1 mr-3 primary">
            <v-icon left small dark>thumb_up</v-icon>추천
          </v-btn>
          <v-btn class="mx-1 error">
            <v-icon left small dark>report_problem</v-icon>신고하기
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-content>
</template>

<script>
import PostService from "@/services/post.service";

export default {
  data() {
    return {
      defaultPost: "게시글을 선택하세요",
      post_id: "",
      post_contents: []
    };
  },

  created() {
    this.post_id = this.$route.params.post_id;
    this.getPost();
  },

  watch: {
    $route() {
      this.post_id = this.$route.params.post_id;
      this.getPost();
    }
  },

  methods: {
    async getPost() {
      const tmp = await PostService.getPostContents({
        type: "study",
        post_id: this.post_id
      });
      this.post_contents = tmp.data;
    }
  }
};
</script>

<style scoped>
</style>