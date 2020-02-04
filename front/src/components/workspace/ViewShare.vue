<template>
  <v-container>
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

      peer_connections: {}
    };
  },
  props: ["socket", "user_id", "sharing_user_id"],
  methods: {
    async get_stream(stream) {
      this.view_share_video = await document.getElementById("view_share");
      this.local_stream = stream;
      // this.view_share_video.srcObject = this.local_stream
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
            from: this.user_id
          });
        }
      };

      t_pc.onaddstream = event => {
        this.view_share_video.srcObject = event.stream;
        console.log(event.stream, "onaddstream");
      };

      t_pc.addStream(this.local_stream);
      return t_pc;
    }
  },
  mounted() {
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then(this.get_stream);

    this.socket.on("join", data => {
      if (this.user_id !== this.sharing_user_id) {
        return;
      }
      const user_id = data.user_id;

      setTimeout(() => {
        this.getPeerConnection(user_id).then(t_pc => {
          t_pc.createOffer(
            sdp => {
              t_pc.setLocalDescription(sdp);
              this.sendMessage({
                message: sdp,
                study_id: 1,
                from: this.user_id
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
      if (data.user_id === this.sharing_user_id) {
        this.view_share_video.srcObject = null;
      }
      delete this.peer_connections[data.user_id];
    });

    this.socket.on("viewsharing", data => {
      if (data.message.type === "offer") {
        const from = data.from;

        this.getPeerConnection(from).then(t_pc => {
          t_pc.setRemoteDescription(new RTCSessionDescription(data.message));
          t_pc.createAnswer().then(sdp => {
            t_pc.setLocalDescription(sdp);
            this.sendMessage({
              message: sdp,
              study_id: 1,
              from: this.user_id
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