<template>
  <v-container fluid class="pa-2">
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
              <FaceTalk :socket="socket" :user_id="user_id" />
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
      socket: "",
      user_id: null,
    };
  },

  components: {
    Board: Board,
    Chatting: Chatting,
    FaceTalk: FaceTalk
  },

  created() {
    this.user_id = Math.ceil(Math.random() * 100000)
    
    this.socket = io.connect("http://70.12.247.73:8210", {
    // this.socket = io.connect("http://70.12.247.73:3000", {
      transports: ["websocket"],
      secure: true
    });
    this.socket.emit("join", {study_id : 1, user_id: this.user_id});

  },
  mounted(){
    window.onbeforeunload = () => {
      this.socket.emit('leave', {study_id : 1, user_id: this.user_id});
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