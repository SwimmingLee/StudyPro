<template>
  <v-content id="board">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card app>
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
            <v-tab href="#register">
              <v-icon left>create</v-icon>register
            </v-tab>

            <v-tab-item id="studyBoard">
              <v-card outlined>
                <studyBoard />
              </v-card>
            </v-tab-item>
            <v-tab-item id="freeBoard">
              <v-card outlined>
                <freeBoard />
              </v-card>
            </v-tab-item>
            <v-tab-item id="noticeBoard">
              <v-card outlined>
                <noticeBoard />
              </v-card>
            </v-tab-item>
            <v-tab-item id="register">
              <v-card outlined>
                <register />
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import board_study from "@/components/board/board_study";
import board_free from "@/components/board/board_free";
import board_notice from "@/components/board/board_notice";
import board_register from "@/components/board/board_register";

export default {
  name: "board",
  data() {
    return {};
  },

  components: {
    studyBoard: board_study,
    freeBoard: board_free,
    noticeBoard: board_notice,
    register: board_register
  }
};
</script>