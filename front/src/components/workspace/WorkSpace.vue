<template>
  <!-- <v-container fluid class="pa-2"> -->
    <v-card class="px-4 customTheme lighten-2">
      <v-row>
        <v-col :cols="talk ? 8 : 12" id="col" >
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
            <v-card>
              <v-btn mx-2 @click="collapse">
                <v-icon v-if="talk">arrow_forward</v-icon>
                <v-icon v-else>arrow_back</v-icon>
            </v-btn> <br>
            <v-btn width="100%" @click="exit">
              <v-icon>power_settings_new</v-icon>
            </v-btn>
            </v-card>
            <v-tab-item id="Board">
              <v-card outlined>
                <Board :socket="socket" :study_id="study_id" />
              </v-card>
            </v-tab-item>
            <v-tab-item id="NotePad">
              <v-card outlined>
                <NotePad :socket="socket" :study_id="study_id" />
              </v-card>
            </v-tab-item>
            <v-tab-item id="ViewShare">
              <v-card outlined>
                <ViewShare :socket="socket" :user_id="user_id" :study_id="study_id" :connected_users="connected_users" @changeView="changeView" />
              </v-card>
            </v-tab-item>
            <v-tab-item id="Help">
              <v-card outlined>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-col>
        <v-col align="center" justify="center" v-show="talk">
          <v-card outlined tile>
            <v-row no-gutters hidden class="pa-0">
              <FaceTalk :socket="socket" :user_id="user_id" :study_id="study_id" @connected="connected" :sharing_id="sharing_id" />
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-card outlined>
                  <Chatting class="pa-0 ma-0" :socket="socket" :study_id="study_id" :user_id="user_id" />
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  <!-- </v-container> -->
</template>

<script>
import io from "socket.io-client";
import Board from "@/components/workspace/Board";
import NotePad from "@/components/workspace/NotePad";
import ViewShare from "@/components/workspace/ViewShare";
import FaceTalk from "@/components/workspace/FaceTalk";
import Chatting from "@/components/workspace/Chatting";
// import fs from 'fs'
// const option = {
//   key: fs.readFileSync('../../../T02A106.pem'),
// }

export default {
  data() {
    return {
      tabs: null,
      socket: "",
      user_id: null,
      connected_users: [],
      sharing_id: "no one",

      talk: true,
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
    this.study_id = window.location.href.split('workspace/')[1]
    // this.socket = io.connect(`http://70.12.246.89:8210/?study_id=${this.study_id}&user_id=${this.user_id}`, {
    this.socket = io.connect(`http://70.12.247.73:8210/?study_id=${this.study_id}&user_id=${this.user_id}`, {
    // this.socket = io.connect(`https://15.164.245.201:8210/?study_id=${this.study_id}&user_id=${this.user_id}`, {
    // this.socket = io.connect(`https://i02a106.p.ssafy.io:8210/?study_id=${this.study_id}&user_id=${this.user_id}`, {
    // this.socket = io.connect(`wss://us-central1-test-back-24347.cloudfunctions.net/server/?study_id=${this.study_id}&user_id=${this.user_id}`, {
      transports: ["websocket"],
      secure: true,
    });
    this.socket.emit("join", { study_id: this.study_id, user_id: `${this.user_id}` });
  },
  mounted() {
    window.onbeforeunload = () => {
      this.socket.emit("leave", { study_id: this.study_id, user_id: `${this.user_id}` });
    };

    this.socket.on('alreadyexist', () => {
      alert('못들어온단다 아가야')

      window.opener.closechild()
    })
  },
  methods: {
    changeView(change_id) {
      this.sharing_id = change_id
    },

    async collapse() {
      this.talk = !this.talk
    },

    exit() {
      window.opener.closechild()
    },

    connected(connected_users) {
      this.connected_users = connected_users.filter(user => user && user != -1)
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