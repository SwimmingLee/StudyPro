<template>
  <v-content>
    <v-card>{{this.post_contents.id}}</v-card>
  </v-content>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post_id: "",
      post_contents: []
    };
  },

  created() {
    this.post_id = this.$route.params.post_id;
    this.getPostContents();
  },

  methods: {
    getPostContents(post_id) {
      const tmp = axios.get(process.env.VUE_APP_API_URL + "posts", {
        params: {
          type: "study",
          post_id: post_id
        }
      });
      this.post_contents = tmp;
      console.log(this.post_contents);
    }
  }
};
</script>