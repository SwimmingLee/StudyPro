<template>
  <v-container fluid class="siz pa-2">
    <v-card class="px-4 customTheme lighten-2">
      <v-row>
        <v-col cols="12" md="8">
          <v-card outlined>
            <Board :socket="socket" />
          </v-card>
        </v-col>
        <v-col align="center" justify="center">
          <v-card outlined tile>
            <v-row no-gutters class="pa-0">
              <FaceTalk :socket="socket" />
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-card outlined>
                  <Chatting class="pa-0 ma-0" :socket="socket" />
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import io from "socket.io-client";
import Board from "@/components/workspace/Board";
import Chatting from "@/components/workspace/Chatting";
import FaceTalk from "@/components/workspace/FaceTalk";

export default {
  data() {
    return {
      tabs: null,
      socket: ""
    };
  },

  components: {
    Board: Board,
    Chatting: Chatting,
    FaceTalk: FaceTalk
  },

  created() {
    this.socket = io.connect("http://70.12.246.89:8210", {
    // this.socket = io.connect("http://70.12.247.73:3000", {
      transports: ["websocket"],
      secure: true
    });
    this.socket.emit("join", 1);
  }
};
</script>

<style scoped>
.siz {
  height: 100vh !important;
}
</style>