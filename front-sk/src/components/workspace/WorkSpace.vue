<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" md="8">
        <v-card outlined tile min-width="640" height="650">
          <Board />
        </v-card>
      </v-col>
      <v-col align="center" justify="center">
        <v-card outlined tile>
          <v-row no-gutters>
            <v-col cols="12" lg="4" md="6" sm="2" class="d-none d-md-block">
              <v-card outlined tile width="150" height="200"></v-card>
            </v-col>
            <v-col cols="12" lg="4" md="6" sm="2" class="d-none d-md-block">
              <v-card outlined tile width="150" height="200"></v-card>
            </v-col>
            <v-col cols="12" lg="4" md="6" sm="2" class="d-none d-md-block">
              <v-card outlined tile width="150" height="200"></v-card>
            </v-col>
            <v-col cols="12" lg="4" md="6" sm="2" class="d-none d-md-block">
              <v-card outlined tile width="150" height="200"></v-card>
            </v-col>
            <v-col cols="12" lg="4" md="6" sm="2" class="d-none d-md-block">
              <v-card outlined tile width="150" height="200"></v-card>
            </v-col>
            <v-col cols="12" lg="4" md="6" sm="2" class="d-none d-md-block">
              <v-card outlined tile width="150" height="200"></v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters flex>
      <v-col>
        <v-container dark>
          <v-row>
            <v-col cols="12">
              <Chatting/>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="//code.jquery.com/jquery-1.11.1.js"></script>

<script>
import Board from "@/components/workspace/Board";
import Chatting from "@/components/workspace/Chatting";

export default {
  data() {
    return {};
  },
  
  components: {
    Board: Board,
    Chatting: Chatting,
  }
};
</script>

<style scoped>
.fill-height {
  height: initial !important;
}
</style>