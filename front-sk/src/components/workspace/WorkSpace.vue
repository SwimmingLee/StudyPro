<template>
  <v-container fluid class="siz pa-2">
    <v-card class=" px-4 customTheme lighten-2">
      <v-row>
        <v-col cols="12" md="8">
          <v-card outlined>
            <Board />
          </v-card>
        </v-col>
        <v-col align="center" justify="center">
          <v-card outlined tile>
            <v-row no-gutters class="pl-0">
              <v-col cols="12" md="6" class="d-none d-md-block">
                <v-card outlined tile flex></v-card>
              </v-col>
              <v-col cols="12" md="6" class="d-none d-md-block">
                <v-card outlined tile flex min-height="150"></v-card>
              </v-col>
              <v-col cols="12" md="6" class="d-none d-md-block">
                <v-card outlined tile flex min-height="150"></v-card>
              </v-col>
              <v-col cols="12" md="6" class="d-none d-md-block">
                <v-card outlined tile flex min-height="150"></v-card>
              </v-col>
              <v-col cols="12" md="6" class="d-none d-md-block">
                <v-card outlined tile flex min-height="150"></v-card>
              </v-col>
              <v-col cols="12" md="6" class="d-none d-md-block">
                <v-card outlined tile flex min-height="150"></v-card>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-card outlined >
                  <Chatting class="pa-0 ma-0" />
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-row class="pa-0">
          <v-col class="pa-0 ma-0">
            <v-container dark class="pa-0 ma-0">
              <v-row no-gutters flex class="pa-0 ma-0">
                <v-col cols="12" class="pa-0 ma-0">
                  
                </v-col>
              </v-row>
            </v-container>
          </v-col>
      </v-row>-->
    </v-card>
  </v-container>
</template>

<script>
import Board from "@/components/workspace/Board";
import Chatting from "@/components/workspace/Chatting";

export default {
  data() {
    return {
      tabs: null
    };
  },

  components: {
    Board: Board,
    Chatting: Chatting
  }
};
</script>

<style scoped>
.siz{
  height: 100vh !important;
}
</style>