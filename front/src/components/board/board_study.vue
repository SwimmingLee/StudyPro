<template>
  <v-container flex>
    <v-flex class="ma-2 mb-5">
      <v-icon large class="mr-2" color="black">menu_book</v-icon>스터디 게시판
    </v-flex>
    <v-row justify="center">
      <v-expansion-panels class="pa-3" multiple popout>
        <v-expansion-panel v-for="(item, index) in postList" :key="index">
          <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <span v-html="item.content"></span>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <v-row justify="center" class="ma-5">
      <v-pagination v-model="page" :length="lastpage" :total-visible="9"></v-pagination>
    </v-row>
  </v-container>
</template>

<script>
import PostService from "@/services/post.service";

export default {
  data() {
    return {
      page: 1,
      lastpage: 1,
      post_number: 0,
      post_list: []
    };
  },

  created() {
    this.postUpdate();
  },

  watch: {
    page() {
      this.postUpdate();
    }
  },

  computed: {
    postList: function() {
      console.log(this.post_list)
      return this.post_list;
    }
  },

  methods: {
    async postUpdate() {
      const nPost = await PostService.getPostNumber({
        type: "study",
        board: "study",
        study_id: 8
      });
      this.lastpage =
        parseInt(nPost.data.post_number / 10) +
        (nPost.data.post_number % 10 === 0 ? 0 : 1);

      const postList = await PostService.getAllPost({
        type: "study",
        board: "study",
        study_id: 8,
        offset: (this.page - 1) * 10
      });

      console.log("comoued", postList.data)
      this.post_list = postList.data;
      //return postList.data;
      //this.set(this.post_list, 1, postList.data);
    }
  }
};
</script>