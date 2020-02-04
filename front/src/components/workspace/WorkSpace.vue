<template>
  <v-container fluid class="pa-2">
    <v-card class="px-4 customTheme lighten-2">
      <v-row>
        <v-col cols="12" md="8">
          <v-tabs grow icons-and-text centered dark color="cyan">
            <v-tabs-slider color="red"></v-tabs-slider>
            <v-tab href="#Board">
              WhiteBoard
              <v-icon>color_lens</v-icon>
            </v-tab>
            <v-tab href="#ViewShare">
              Share View
              <v-icon>computer</v-icon>
            </v-tab>
            <v-tab href="#NotePad">
              NotePad
              <v-icon>event_note</v-icon>
            </v-tab>
            <v-tab-item id="Board">
              <v-card outlined>
                <Board :socket="socket" />
              </v-card>
            </v-tab-item>
            <v-tab-item id="NotePad">
              <v-card outlined>
                <NotePad :socket="socket" />
              </v-card>
            </v-tab-item>
            <v-tab-item id="ViewShare">
              <v-card outlined>
                <ViewShare :socket="socket" />
              </v-card>
            </v-tab-item>
          </v-tabs>
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
import NotePad from "@/components/workspace/NotePad";
import ViewShare from "@/components/workspace/ViewShare";
import FaceTalk from "@/components/workspace/FaceTalk";
import Chatting from "@/components/workspace/Chatting";

export default {
  data() {
    return {
      tabs: null,
      socket: ""
    };
  },

  components: {
    Board: Board,
    ViewShare: ViewShare,
    NotePad: NotePad,
    FaceTalk: FaceTalk,
    Chatting: Chatting,
  },
  created() {
    console.log('workspace created')
    this.socket = io.connect("http://70.12.246.89:8210", {
      // this.socket = io.connect("http://70.12.247.73:3000", {
      transports: ["websocket"],
      secure: true
    });
    this.socket.emit("join", 1);
  },
  mounted() {
    console.log('workspace mounted')
    window.onbeforeunload = () => {
      this.socket.emit("leave", 1);
    };
  }
};
</script>

<style scoped>
.siz {
  width: 100vh !important;
  height: 100vh !important;
}
</style>