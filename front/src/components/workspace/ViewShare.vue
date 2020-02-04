<template>
  <v-container>
    
    <!-- <p v-for="user in connected_users" :key="user" :value="user">{{user}}</p> -->
    <select v-model="sharing_user_id" style = "border : 1px solid #000000">
        <option disabled value="">Please select one</option>
        <option :value="user_id">{{ user_id }}</option>
        <option v-for="user in connected_users" :value="user" :key="user">{{user}}</option>
    </select>
    <v-card>
      <video playsinline id="view_share" autoplay preload="metadata" width="640" height="640"></video>
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
      sharing_user_id: null,
      now_sharing: null,

      peer_connections: {},
      received_pc: null,
    };
  },
  props: ["socket", "user_id", "connected_users"],
  watch: {
    sharing_user_id: function(change) {
        if (change == this.now_sharing) return
        console.log('change share =>', change)
        this.socket.emit('viewsharestart', {user_id : change})
    }
  },
  methods: {
    async get_stream(stream) {
      
      this.local_stream = stream;
      this.view_share_video.srcObject = this.local_stream
    },

    sendMessage(message) {
      console.log("send viewshare : ", message.message.type);
      this.socket.emit("viewshare", message);
    },

    async getPeerConnection(user_id) {
      if (this.peer_connections[user_id]) {
        return this.peer_connections[user_id];
      }
      let t_pc = await new RTCPeerConnection(pcConfig);
      console.log(t_pc)
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
        if (user_id != this.user_id) this.view_share_video.srcObject = event.stream;
        console.log(event.stream, "onaddstream");
      };
      // if (user_id == this.user_id) t_pc.addStream(this.local_stream);
      t_pc.addStream(this.local_stream);
      return t_pc;
    }
  },
  mounted() {
    this.view_share_video = document.getElementById("view_share");
    navigator.mediaDevices.getUserMedia({audio:true})
    .then(stream => {
      this.local_stream = stream
    })
    this.socket.on('viewsharestart', sharing_user_id => {

      console.log('view start', sharing_user_id)
      for (let i in this.peer_connections) delete this.peer_connections[i]
      this.received_pc = null
      this.view_share_video.srcObject = null
      this.now_sharing = sharing_user_id
      console.log(sharing_user_id == this.user_id)
      if (sharing_user_id == this.user_id) {
        navigator.mediaDevices
        .getDisplayMedia({ video: true })
        .then(this.get_stream)
        .then(() => {
          for (let peer_id of this.connected_users) {
            this.getPeerConnection(peer_id)
            .then(t_pc => {
              t_pc.createOffer(sdp => {
                t_pc.setLocalDescription(sdp) 
                this.sendMessage({
                  message: sdp,
                  study_id: 1,
                  from: this.user_id,
                  to: peer_id
                })
              }, e => console.log(e))
              console.log('send offer to', peer_id )
            })
          }
        });
      }

    })


    this.socket.on("join", data => {
      this.peer_connections.push(data.user_id)

      if (this.user_id != this.now_sharing) return
      

      const user_id = data.user_id;

      setTimeout(() => {
        this.getPeerConnection(user_id).then(t_pc => {
          t_pc.createOffer(
            sdp => {
              t_pc.setLocalDescription(sdp);
              this.sendMessage({
                message: sdp,
                study_id: 1,
                from: this.user_id,
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
        this.view_share_video.srcObject = null;
      }
      delete this.peer_connections[data.user_id];
    });

    this.socket.on("viewshare", data => {
      console.log(data)
      if (data.message.type === "offer") {
        const from = data.from;
        console.log('get offer')
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
        console.log('get answer')
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