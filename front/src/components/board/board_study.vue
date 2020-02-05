<template>
  <v-container flex>
    <v-flex class="ma-2 mb-5">
      <v-icon large class="mr-2" color="black">menu_book</v-icon>스터디 게시판
    </v-flex>
    <v-row justify="center">
      <v-expansion-panels class="pa-3" multiple popout>
        <v-expansion-panel v-for="(item, index) in post_list" :key="index">
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

  async mounted() {
    let tmp = await PostService.getPostNumber({
      type: "study",
      board: "study",
      study_id: 8
    });
    this.lastpage =
      parseInt(tmp.data.post_number / 10) +
      (tmp.data.post_number % 10 === 0 ? 0 : 1);

    tmp = await PostService.getAllPost({
      type: "study",
      board: "study",
      study_id: 8,
      offset: (this.page - 1) * 10
    });
    this.post_list = tmp.data;
  }
};
</script>