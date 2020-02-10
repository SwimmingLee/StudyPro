<template>
  <v-container fluid>
    <v-btn v-show="sharing_user_id != user.user_id" @click="sharing_user_id = user.user_id">내 화면 보여주기</v-btn>
    <v-btn v-show="sharing_user_id == user.user_id" @click="sharing_user_id = 'no one'">그만 보여주기</v-btn>

    <v-card id="share_block">
      <img src="../../assets/images/noru.jpg" alt="" width="100%" id='noru' >
    </v-card>
  </v-container>
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
  data() {
    return {
      view_share_video: null,
      local_stream: null,
      sharing_user_id: "no one",
      now_sharing: "no one",
      already_sharing: false,
      share_block: null,

      peer_connections: {},
    };
  },
  created() {
    this.socket.emit('viewsharejoin', {user_id: this.user.user_id, study_id: this.study_id})
  },
  props: ["socket", "user", "study_id", "connected_users"],
  watch: {
    sharing_user_id: function(change) {
        this.$emit('changeView', change)
        if (this.now_sharing == change) return
        this.socket.emit('viewsharestart', {user_id : change, study_id: this.study_id})
    }
  },
  methods: {
    async get_stream(stream) {
      
      this.local_stream = stream;
      this.share_block.childNodes[0] == 'img' ? 0 : this.share_block.childNodes[0].srcObject = this.local_stream

    },

    sendMessage(message) {
      this.socket.emit("viewshare", message);
    },

    async getPeerConnection(user_id) {
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
            from: this.user.user_id,
            to: user_id
          });
        }
      };

      t_pc.onaddstream = event => {
        if (user_id != this.user.user_id) {
          this.share_block.childNodes[0].srcObject = event.stream;
          this.already_sharing = true
        }
      };
      t_pc.addStream(this.local_stream);
      return t_pc;
    },
    
    createVideo() {
      let t_video = document.createElement('video')
      t_video.srcObject = null
      t_video.style.width = '100%'
      t_video.autoplay = true
      t_video.playsinline = true

      return t_video
    },

    createImg(i) {
      let t_img = document.createElement('img')
      t_img.src = i ? require('../../assets/images/noru.jpg') : require('../../assets/images/now_sharing.jpg') 
      t_img.style.width = '100%'

      return t_img
    }
  },
  mounted() {
    this.share_block = document.getElementById("share_block")
    navigator.mediaDevices.getUserMedia({audio:true})
    .then(stream => {
      this.local_stream = stream
    })
    this.socket.on('viewsharestart', sharing_user_id => {
      for (let i in this.peer_connections) delete this.peer_connections[i]
      this.sharing_user_id = sharing_user_id
      this.now_sharing = sharing_user_id
      this.already_sharing = false
      this.view_share_video = this.createVideo()
      for (let i of this.share_block.childNodes) this.share_block.removeChild(i) 

      if (sharing_user_id == 'no one') {
        this.share_block.appendChild(this.createImg(1))
        return
      }
      this.user.user_id == sharing_user_id ? this.share_block.appendChild(this.createImg(0)) : this.share_block.appendChild(this.view_share_video)
      
      if (sharing_user_id == this.user.user_id) {
        navigator.mediaDevices
        .getDisplayMedia({ video: true })
        .then(this.get_stream)
        .then(() => {
          for (let peer_id of this.connected_users) {
            if (peer_id == this.user.user_id) continue
            this.getPeerConnection(peer_id)
            .then(t_pc => {
              t_pc.createOffer(sdp => {
                t_pc.setLocalDescription(sdp) 
                this.sendMessage({
                  message: sdp,
                  study_id: this.study_id,
                  from: this.user.user_id,
                  to: peer_id
                })
              }, e => console.log(e))
            })
          }
        });
      }

    })


    this.socket.on("viewsharejoin", user_id => {

      if (this.user.user_id != this.now_sharing) return

      setTimeout(() => {
        this.getPeerConnection(user_id).then(t_pc => {
          t_pc.createOffer(
            sdp => {
              t_pc.setLocalDescription(sdp);
              this.sendMessage({
                message: sdp,
                study_id: this.study_id,
                from: this.user.user_id,
                to: user_id
              });
            },
            e => {
              console.log(e);
            }
          );
        });
      }, 1000);
    });

    this.socket.on("leave", data => {
      if (data.user_id == this.now_sharing) {
        for (let i of this.share_block.childNodes) this.share_block.removeChild(i)
        this.sharing_user_id = 'no one'
        this.share_block.appendChild(this.createImg(1))
      }
    });

    this.socket.on("viewshare", data => {
      if (data.message.type === "offer") {
        this.view_share_video = this.createVideo()
        this.now_sharing = data.from
        this.sharing_user_id = data.from
        for (let i of this.share_block.childNodes) this.share_block.removeChild(i) 
        this.share_block.appendChild(this.view_share_video)
        const from = data.from;
        this.getPeerConnection(from).then(t_pc => {
          t_pc.setRemoteDescription(new RTCSessionDescription(data.message));
          t_pc.createAnswer().then(sdp => {
            t_pc.setLocalDescription(sdp);
            this.sendMessage({
              message: sdp,
              study_id: this.study_id,
              from: this.user.user_id,
              to: from
            });
          });
        });
      } else if (data.message.type === "answer") {
        this.getPeerConnection(data.from)
        .then(t_pc => {
          t_pc.setRemoteDescription(new RTCSessionDescription(data.message));
        })
        
      } else if (data.message.type === "candidate") {
        let candidate = new RTCIceCandidate({
          sdpMLineIndex: data.message.label,
          candidate: data.message.candidate
        });
        this.getPeerConnection(data.from)
        .then(t_pc => {
          t_pc.addIceCandidate(candidate);
        });
      }
    });
  }
};
</script>