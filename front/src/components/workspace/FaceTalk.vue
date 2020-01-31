<template>
  <v-card class="pa-0">
    <v-row no-gutters class="pa-0">
      <v-col cols="12" md="6" class="d-none d-md-block" @contextmenu="showProfileMenu">
        <v-card outlined tile flex min-height="150">
          <video playsinline id="local_video" autoplay preload="metadata" width="100%" height="150"></video>
          <v-menu v-model="showProfile" :position-x="x" :position-y="y" offset-y absolute>
            <v-card width="300">
              <v-list class="pa-0">
                <v-list-item>
                  <v-list-item-avatar>
                    <img src="@/assets/images/pengsoo.jpg" alt="PengSoo" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>PengSoo</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                      <v-icon>favorite</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-divider />
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>I'm PengSoo. 친구추가 하지마세요 진짜로 ㅋㅋㅋㅋㅋ</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-card-actions>
                <v-btn class="ml-auto" color="error" text @click="showProfile = false">닫기</v-btn>
                <v-btn class="ml-0" color="primary" text @click="showProfile = false">친구 추가</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="d-none d-md-block">
        <v-card outlined tile flex min-height="150">
          <video
            playsinline
            id="remote_video"
            autoplay
            preload="metadata"
            width="100%"
            height="150"
          ></video>
        </v-card>
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
  </v-card>
</template>

<script>
const stun_server = "stun.l.google.com:19302";
const pcConfig = {
  iceServers: [
    {
      urls: "stun:" + stun_server
    }
  ]
};

let pc;
let local_video = document.getElementById("local_video");
let local_stream = null;

export default {
  props: ["socket"],
  data() {
    return {
      // FaceTalk
      stun_server: "stun.l.google.com:19302",
      isHost: false,
      isStarted: false,
      remote_video: null,
      remote_stream: null,

      fav: false,
      showProfile: false,
      x: 0,
      y: 0,
      items: [{ title: "Hello" }]
    };
  },
  methods: {
    // FaceTalk
    HandlerOnAddStream(event) {
      console.log("onAddStream");
      this.remote_stream = event.stream;
      this.remote_video.srcObject = this.remote_stream;
    },

    sendMessage(message) {
      console.log("send", message.type);
      this.socket.emit("message", { message: message, room_id: 1 });
    },

    HandlerOnIceCandidate(event) {
      console.log("oniceCandidate");
      if (event.candidate) {
        this.sendMessage({
          type: "candidate",
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate
        });
      } else {
        console.log("no candidate");
      }
    },

    async maybeStart() {
      if (!this.isStarted) {
        pc = new RTCPeerConnection(pcConfig);
        pc.onicecandidate = this.HandlerOnIceCandidate;
        pc.onaddstream = this.HandlerOnAddStream;
        console.log("create Peer_connection");

        console.log("111111111111", local_stream);
        pc.addStream(local_stream);
        this.isStarted = true;

        if (this.isHost) {
          this.doCall();
        }
      }
    },
    setLocalAndSendMessage(sdp) {
      pc.setLocalDescription(sdp);
      this.sendMessage(sdp);
    },
    doCall() {
      console.log("doCall");
      pc.createOffer(this.setLocalAndSendMessage, function(e) {
        console.log(e);
      });
    },

    doAnswer() {
      pc.createAnswer().then(this.setLocalAndSendMessage, function(e) {
        console.log(e);
      });
    },

    async got_stream(stream) {
      local_video = await document.getElementById("local_video");
      console.log("gotStream");
      local_video.srcObject = stream;
      local_stream = stream;
    },

    showProfileMenu(e) {
      e.preventDefault();
      this.showProfile = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showProfile = true;
      });
    }
  },

  mounted() {
    this.remote_video = document.getElementById("remote_video");

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true
      })
      .then(this.got_stream);

    this.socket.on('join', message => {
      console.log(message, 'join')
    })

    this.socket.on('leave', message => {
      console.log(message, 'leave')
    })

    this.socket.on("message", message => {

      if (message === "get user") {
        setTimeout(() => {
          this.maybeStart();
        }, 1000);
      } else if (message.type === "offer") {
        console.log("get offer");
        if (!this.isStarted) {
          this.maybeStart();
        }
        pc.setRemoteDescription(new RTCSessionDescription(message));
        this.doAnswer();
      } else if (message.type === "answer" && this.isStarted) {
        pc.setRemoteDescription(new RTCSessionDescription(message));
        console.log("get answer", message);
      } else if (message.type === "candidate") {
        let candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
        });
        pc.addIceCandidate(candidate);
      }
    });
  }
};
</script>