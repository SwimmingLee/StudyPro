<template>
  <v-content>
    <v-card class="mx-3 my-2">
      <v-row>
        <v-col cols="12" class="px-7 py-3">
          <p>제목 : {{ this.defaultPost }} {{ this.post_id }}</p>
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
    console.log("created");
  },

  watch: {
    $route() {
      this.post_id = this.$route.params.post_id;
      this.getPost();
      console.log("route");
    }
  },

  methods: {
    async getPost() {
      const tmp = await PostService.getPostContents({
        params: {
          type: "study",
          post_id: this.post_id
        }
      });
      this.post_contents = tmp;
      console.log(this.post_contents);
    }
  }
};
</script>
