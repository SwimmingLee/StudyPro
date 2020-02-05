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
            <v-tab href="#Help">
              Help
              <v-icon>help_outline</v-icon>
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
                <ViewShare :socket="socket" :user_id="user_id" :connected_users="connected_users" />
              </v-card>
            </v-tab-item>
            <v-tab-item id="Help">
              <v-card outlined>
                
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-col>
        <v-col align="center" justify="center">
          <v-card outlined tile>
            <v-row no-gutters hidden class="pa-0">
              <FaceTalk :socket="socket" :user_id="user_id" @connected="connected" />
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
      socket: "",
      user_id: null,
      connected_users: [],
    };
  },

  components: {
    Board: Board,
    ViewShare: ViewShare,
    NotePad: NotePad,
    FaceTalk: FaceTalk,
    Chatting: Chatting
  },
  created() {
    this.user_id = `${Math.ceil(Math.random() * 100000)}`
    
    // this.socket = io.connect("http://70.12.246.89:8210?study_id=1&user_id="+this.user_id, {
    this.socket = io.connect("http://70.12.247.73:8210?study_id=1&user_id="+this.user_id, {
      // this.socket = io.connect("http://70.12.247.73:8210", {
      transports: ["websocket"],
      secure: true,
      study_id : 1
    });
    this.socket.emit("join", { study_id: 1, user_id: `${this.user_id}` });
  
  },
  mounted() {
    console.log('workspace mounted')
    window.onbeforeunload = () => {
      this.socket.emit("leave", { study_id: 1, user_id: `${this.user_id}` });
    };
  },
  methods: {
    connected(connected_users) {
      this.connected_users = connected_users.filter(user => user && user != -1)
      console.log(this.connected_users, 'connected')
    }
  }
};
</script>

<style scoped>
.siz {
  width: 100vh !important;
  height: 100vh !important;
}
</style>