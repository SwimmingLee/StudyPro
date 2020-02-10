<template>
  <v-card class="pa-0">
    <v-row no-gutters class="pa-0" border="0px">
      <v-col cols="12" md="6" class="d-none d-md-block" >
        <v-card position="relative" outlined tile flex min-height="150" id="remote_block_0">
          <video position="absolute" playsinline id="local_video" autoplay preload="metadata" width="100%" height="100%" @contextmenu="showProfileMenu($event, 0)"></video>
        </v-card>
      </v-col>
      <v-col v-for="i of [1,2,3,4,5]" :key="i" cols="12" md="6" class="d-none d-md-block" @contextmenu="showProfileMenu($event, i)">
        <v-card class="ma-0 pa-0" outlined tile flex min-height="150" :id="`remote_block_${i}`">
          <img
            src="../../assets/images/pengsoo.jpg"
            alt="펭수"
            width="100%"
            height="100%"
            id="pengsoo"
          />
        </v-card>
      </v-col>
    </v-row>
    <profile :profile="profile"></profile>
  </v-card>
</template>

<script>
import profile from './Profile'
const stun_server = "stun.l.google.com:19302";
const pcConfig = {
  iceServers: [
    {
      urls: "stun:" + stun_server
    }
  ]
};

export default {
  props: ["socket", "user_id", "study_id", "sharing_id"],
  data() {
    return {
      // FaceTalk
      post_img: null,
      local_video: null,
      local_stream: null,

      connected_users: [this.user_id, null, null, null, null, null],
      peer_connections: {},

      remote_videos: [null],
      remote_streams: [null, null, null, null, null, null],
      profile : {
        fav: false,
        showProfile: false,
        x: 0,
        y: 0,
        items: [{ title: "Hello" }]
      }
    };
  },
  watch: {
    sharing_id: function(change_id, before_id) {
      
      const video_num = this.connected_users.indexOf(change_id)
      for (let i in this.connected_users) {
        i == video_num ? this.makeBorder(i) : this.deleteBorder(i, before_id)
      }
    }
  },
  components: {
    profile: profile
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

    showProfileMenu(e,i) {
      console.log(i)
      e.preventDefault();
      this.profile.showProfile = false;
      this.profile.x = e.clientX;
      this.profile.y = e.clientY;
      this.$nextTick(() => {
        this.profile.showProfile = true;
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
            study_id: this.study_id,
            from: this.user_id,
            to: user_id
          });
        }
      };

      t_pc.onaddstream = event => {
        let remote_video = document.createElement("video");
        this.remote_streams[video_num] = event.stream;
        remote_video.playsinline = true
        remote_video.srcObject = this.remote_streams[video_num]
        remote_video.autoplay = true
        remote_video.style.width = "100%"
        remote_video.style.height = "100%"
        remote_video.style.zIndex = "1"
        remote_video.style.left = "0"
        
        const remote_block = this.remote_videos[video_num]
        for (let i of this.remote_videos[video_num].childNodes) this.remote_videos[video_num].removeChild(i)
        remote_block.appendChild(remote_video)
      }


      t_pc.addStream(this.local_stream);
      return t_pc;
    },

    makeBorder(video_num) {    
      this.remote_videos[video_num].style.border = '3px'
      this.remote_videos[video_num].style.borderStyle = 'solid'
      this.remote_videos[video_num].style.borderColor = '#f4ff00'
      this.remote_videos[video_num].appendChild(this.createEye())
      this.remote_videos[video_num].childNodes[1].style.left = "25%"
      this.remote_videos[video_num].childNodes[1].style.top = "25%"


    },

    deleteBorder(video_num, before_id) {
      if (this.connected_users[video_num] !== before_id) return
      this.remote_videos[video_num].style.border = '0px'
      this.remote_videos[video_num].removeChild(this.remote_videos[video_num].childNodes[1])
    },

    createEye() {
      const eye = document.createElement('img')
      eye.src = require('../../assets/images/eye.png')
      eye.style.width = "50%"
      eye.style.position = "absolute"
      eye.style.zIndex = "3"


      return eye
    }
  },

  created() {
    console.log("내아이디 : ", this.user_id);
  },
  mounted() {


    for (let i = 1; i <= 5; i++) {
      this.remote_videos.push(document.getElementById(`remote_block_${i}`));
    }
    this.local_video = document.getElementById("local_video");
    this.remote_videos[0] = document.getElementById('remote_block_0')
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
      console.log(this.connected_users)
      this.$emit('connected', this.connected_users)
      setTimeout(() => {
        this.getPeerConnection(user_id)
        .then( t_pc => {
          t_pc.createOffer(sdp => {
            t_pc.setLocalDescription(sdp) 
            this.sendMessage({
              message: sdp,
              study_id: this.study_id,
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
      for (let i of this.remote_videos[video_num].childNodes) this.remote_videos[video_num].removeChild(i)
      const post_img = document.createElement('img')
      post_img.src = require('../../assets/images/pengsoo.jpg')
      post_img.style.width = "100%"
      post_img.style.height = "100%"
      this.remote_videos[video_num].appendChild(post_img)
      this.remote_streams[video_num] = null
      this.$emit('connected', this.connected_users)
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
        this.$emit('connected', this.connected_users)
        this.getPeerConnection(from).then(t_pc => {
          t_pc.setRemoteDescription(new RTCSessionDescription(data.message));
          t_pc.createAnswer().then(sdp => {
            t_pc.setLocalDescription(sdp);
            this.sendMessage({
              message: sdp,
              study_id: this.study_id,
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