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
          <video playsinline id="remote_video_1" autoplay preload="metadata" width="100%" height="150"></video>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="d-none d-md-block">
        <v-card outlined tile flex min-height="150">
          <video playsinline id="remote_video_2" autoplay preload="metadata" width="100%" height="150"></video>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="d-none d-md-block">
        <v-card outlined tile flex min-height="150">
          <video playsinline id="remote_video_3" autoplay preload="metadata" width="100%" height="150"></video>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="d-none d-md-block">
        <v-card outlined tile flex min-height="150">
          <video playsinline id="remote_video_4" autoplay preload="metadata" width="100%" height="150"></video>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="d-none d-md-block">
        <v-card outlined tile flex min-height="150">
          <video playsinline id="remote_video_5" autoplay preload="metadata" width="100%" height="150"></video>
        </v-card>
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

export default {
  props: ["socket", "user_id"],
  data() {
    return {

      // FaceTalk
      stun_server: "stun.l.google.com:19302",
      isHost: false,
      isStarted: false,
      remote_video: null,
      remote_stream: null,

      local_video: null,
      local_stream: null,

      connected_users: [-1, null, null, null, null, null],
      peer_connections: {},

      remote_videos: [null],
      remote_streams: [null, null, null, null, null, null],
      temp_remote_video: null,
      temp_remote_stream: null,
      is_host: [null, false, false, false, false, false],

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
      this.temp_remote_video.srcObject = this.temp_remote_stream;
    },

    sendMessage(message) {
      console.log("send", message.type);
      this.socket.emit("message", message);
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

        pc.addStream(this.local_stream);
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
      this.local_video = await document.getElementById("local_video");
      console.log("gotStream");
      this.local_video.srcObject = stream;
      this.local_stream = stream;
    },

    showProfileMenu(e) {
      e.preventDefault();
      this.showProfile = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showProfile = true;
      });
    },

    async getPeerConnection(user_id) {
      let video_num, temp_null = 10, existed_num = null
      for (let idx in this.connected_users) {
        if (this.connected_users[idx] === user_id) { existed_num = idx }
        else if (!this.connected_users[idx]) {
          temp_null = temp_null > idx ? idx : temp_null
        }
      }

      video_num = existed_num ? existed_num : temp_null

      if (this.peer_connections[user_id]) {
        return this.peer_connections[user_id]
      }
      let t_pc = await new RTCPeerConnection(pcConfig)
      
      this.peer_connections[user_id] = t_pc

      t_pc.onicecandidate = function(event) {
        if (event.candidate) {
          this.sendMessage({
            message : {
              type: "candidate",
              label: event.candidate.sdpMLineIndex,
              id: event.candidate.sdpMid,
              candidate: event.candidate.candidate
            },
            study_id: 1,
            from: this.user_id,
            to: user_id
          });
      }}

      t_pc.onaddstream = async function(event) {
        let remote_video;

        remote_video = this.remote_videos[video_num]
        this.remote_streams[video_num] = event.stream
        remote_video.srcObject = this.remote_streams[video_num]
      }

      t_pc.addStream(this.local_stream)

      console.log(t_pc, 'created')
      return t_pc
      }
  },

  created() {
    console.log('내아이디 : ', this.user_id)
  },

  mounted() {
    for (let i = 1;  i <= 5; i++) {
    this.remote_videos.push(document.getElementById(`remote_video_${i}`));
    }
    this.local_video = document.getElementById("local_video");

    
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true
      })
      .then(this.got_stream);

    this.socket.on('join', message => {
      const user_id = message.user_id

      if (user_id === this.user_id) return
      for (let idx in this.connected_users) {
        if (!this.connected_users[idx]) {
          this.connected_users[idx] = user_id
          break
        }
      }
      console.log(this.connected_users)

      this.getPeerConnection(user_id)
      .then( t_pc => {
        console.log(t_pc)
        t_pc.createOffer(sdp => {
          this.sendMessage({
            message: sdp,
            study_id: 1,
            from: this.user_id,
            to: user_id
          }), e=> {console.log(e)}
        })
      })      
    })
    this.socket.on('leave', message => {
      const video_num = this.connected_users.indexOf(message.user_id)
      this.connected_users[video_num] = null
      // this.remote_videos[video_num].srcObject = null
      this.remote_streams[video_num] = null
      delete this.peer_connections[message.user_id]

      console.log(this.connected_users)
    })

    this.socket.on("message", message => {
      
      if (message === "get user") {
        setTimeout(() => {
          this.maybeStart();
        }, 1000);
      } else if (message.type === "offer") {
        console.log("get offer");
        const from = message.from

        for (let idx in this.connected_users) {
          if (!this.connected_users[idx]) {
            this.connected_users[idx] = from
            break
          }
        }
        let t_pc = this.getPeerConnection(from)
        t_pc.setRemoteDescription(new RTCSessionDescription(message.message));
        t_pc.createAnswer().then(sdp => {
          this.sendMessage({
            message: sdp,
            study_id: 1,
            from: this.user_id,
            to: from
          })
        })
      } else if (message.type === "answer") {
        let t_pc = this.peer_connections[message.from]
        t_pc.setRemoteDescription(new RTCSessionDescription(message.message));
      } else if (message.type === "candidate") {
        let candidate = new RTCIceCandidate({
          sdpMLineIndex: message.message.label,
          candidate: message.message.candidate
        });
        let t_pc = this.peer_connections[message.from]
        t_pc.addIceCandidate(candidate);
      }
    });
  }
};
</script>