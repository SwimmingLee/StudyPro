<template>
  <v-card class="pa-0">
    <v-row no-gutters class="pa-0">
      <v-col cols="12" md="6" class="d-none d-md-block" @contextmenu="showProfileMenu">
        <v-card outlined tile flex min-height="150">
          <video playsinline id="local_video" autoplay preload="metadata" width="100%" height="150"></video>
        </v-card>
      </v-col>
      <v-col v-for="i of [1,2,3,4,5]" :key="i" cols="12" md="6" class="d-none d-md-block">
        <v-card class="ma-0 pa-0" outlined tile flex min-height="150" :id="`remote_block_${i}`">
          <img
            src="../../assets/images/pengsoo.jpg"
            alt="펭수"
            width="100%"
            height="150"
            id="pengsoo"
          />
        </v-card>
      </v-col>
    </v-row>

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

export default {
  props: ["socket", "user_id"],
  data() {
    return {
      // FaceTalk
      post_img: null,
      local_video: null,
      local_stream: null,

      connected_users: [-1, null, null, null, null, null],
      peer_connections: {},

      remote_videos: [null],
      remote_streams: [null, null, null, null, null, null],

      fav: false,
      showProfile: false,
      x: 0,
      y: 0,
      items: [{ title: "Hello" }]
    };
  },
  methods: {
    // FaceTalk

    sendMessage(message) {
      this.socket.emit("message", message);
    },

    async get_stream(stream) {
      this.local_video = await document.getElementById("local_video");
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
      let video_num,
        temp_null = 10,
        existed_num = null;
      for (let idx in this.connected_users) {
        if (this.connected_users[idx] == user_id) { existed_num = idx }
        else if (!this.connected_users[idx]) {
          temp_null = temp_null > idx ? idx : temp_null
        }
      }

      video_num = existed_num ? existed_num : temp_null;
      if (this.peer_connections[user_id]) {
        return this.peer_connections[user_id];
      }
      let t_pc = await new RTCPeerConnection(pcConfig);

      this.peer_connections[user_id] = t_pc;

      t_pc.onicecandidate = event => {
        if (event.candidate) {
          this.sendMessage({
            message: {
              type: "candidate",
              label: event.candidate.sdpMLineIndex,
              id: event.candidate.sdpMid,
              candidate: event.candidate.candidate
            },
            study_id: 1,
            from: this.user_id,
            to: user_id
          });
        }
      };

      t_pc.onaddstream = event => {
        let remote_video = document.createElement("video");
        this.remote_streams[video_num] = event.stream;

        // remote_video.width = "100%"
        // remote_video.height = 150
        remote_video.playsinline = true
        remote_video.srcObject = this.remote_streams[video_num]
        remote_video.autoplay = true
        remote_video.style.width = "100%"
        remote_video.style.height = "150"
        
        const remote_block = this.remote_videos[video_num]
        this.remote_videos[video_num].childNodes[0] ? remote_block.removeChild(this.remote_videos[video_num].childNodes[0]) : 0
        remote_block.appendChild(remote_video)
      }


      t_pc.addStream(this.local_stream);
      return t_pc;
    }
  },

  created() {
    console.log("내아이디 : ", this.user_id);
  },

  mounted() {
    const pengsoo = document.getElementById("pengsoo")

    for (let i = 1; i <= 5; i++) {
      this.remote_videos.push(document.getElementById(`remote_block_${i}`));
    }
    this.local_video = document.getElementById("local_video");

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true
      })
      .then(this.get_stream);

    this.socket.on("join", message => {
      const user_id = message.user_id;

      if (user_id == this.user_id) return;
      for (let idx in this.connected_users) {
        if (!this.connected_users[idx]) {
          this.connected_users[idx] = user_id;
          break;
        }
      }
      setTimeout(() => {
        this.getPeerConnection(user_id)
        .then( t_pc => {
          t_pc.createOffer(sdp => {
            t_pc.setLocalDescription(sdp) 
            this.sendMessage({
              message: sdp,
              study_id: 1,
              from: this.user_id,
              to: user_id
            })
          }, e => {console.log(e)})
        })      
      }, (1000));

    })
    this.socket.on('leave', message => {
      const video_num = this.connected_users.indexOf(message.user_id)
      this.connected_users[video_num] = null
      this.remote_videos[video_num].removeChild(this.remote_videos[video_num].childNodes[0])
      const post_img = document.createElement('img')
      post_img.src = pengsoo.src
      post_img.style.width = "100%"
      post_img.style.height = 150
      this.remote_videos[video_num].appendChild(post_img)
      this.remote_streams[video_num] = null
      delete this.peer_connections[message.user_id]
    })

    this.socket.on("message", data => {
      if (data.message.type === "offer") {
        const from = data.from;

        for (let idx in this.connected_users) {
          if (!this.connected_users[idx]) {
            this.connected_users[idx] = from;
            break;
          }
        }
        this.getPeerConnection(from).then(t_pc => {
          t_pc.setRemoteDescription(new RTCSessionDescription(data.message));
          t_pc.createAnswer().then(sdp => {
            t_pc.setLocalDescription(sdp);
            this.sendMessage({
              message: sdp,
              study_id: 1,
              from: this.user_id,
              to: from
            });
          });
        });
      } else if (data.message.type === "answer") {
        let t_pc = this.peer_connections[data.from];
        t_pc.setRemoteDescription(new RTCSessionDescription(data.message));
      } else if (data.message.type === "candidate") {
        let candidate = new RTCIceCandidate({
          sdpMLineIndex: data.message.label,
          candidate: data.message.candidate
        });
        let t_pc = this.peer_connections[data.from];
        t_pc.addIceCandidate(candidate);
      }
    });
  }
};
</script>