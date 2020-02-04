<template>
  <v-container flex>
    <v-flex class="ma-2 mb-5">
      <v-icon large class="mr-2" color="black">style</v-icon>자유 게시판
    </v-flex>
    <v-row justify="center">
      <v-expansion-panels class="pa-3" multiple popout>
        <v-expansion-panel v-for="(item, index) in 10" :key="index">
          <v-expansion-panel-header>Content {{ item }}</v-expansion-panel-header>
          <v-expansion-panel-content>Hello Hello Content {{ item }}</v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <v-row justify="center" class="ma-5">
      <v-pagination v-model="page" :length="15" :total-visible="9"></v-pagination>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
// import VueAxious from 'vue-axios'

export default {
  data() {
    return {
      page: 1,
      lastpage: 1
    };
  },

  mounted() {
    axios
      .get("http://localhost:8000/posts/list?board=study")
      .then(function(res) {
        console.log(res);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>