<template>
  <v-content id="board">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card>
          <v-toolbar flat color="customTheme" dark>
            <v-toolbar-title class="ml-5">게시판</v-toolbar-title>
          </v-toolbar>
          <v-tabs vertical>
            <v-tab href="#studyBoard">
              <v-icon left>menu_book</v-icon>Study
            </v-tab>
            <v-tab href="#freeBoard">
              <v-icon left>style</v-icon>Free
            </v-tab>
            <v-tab href="#noticeBoard">
              <v-icon left>notifications_none</v-icon>Notice
            </v-tab>

            <v-tab-item id="studyBoard">
              <v-card outlined>
                <boardList :board="`study`" />
              </v-card>
            </v-tab-item>
            <v-tab-item id="freeBoard">
              <v-card outlined>
                <boardList :board="`free`" />
              </v-card>
            </v-tab-item>
            <v-tab-item id="noticeBoard">
              <v-card outlined>
                <boardList :board="`notice`" />
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import board_list from "@/components/board/board_list";

export default {
  name: "board",
  data() {
    return {};
  },

  components: {
    boardList: board_list,
  }
};
</script>