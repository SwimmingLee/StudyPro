<template>
    <v-container>
        <v-card>
            <video playsinline id="view_share" autoplay preload="metadata" width="640" height="640"></video>
        </v-card>
    </v-container>
</template>

<script>
// const stun_server = "stun.l.google.com:19302";
// const pcConfig = {
//   iceServers: [
//     {
//       urls: "stun:" + stun_server
//     }
//   ]
// };

export default {
    data() {
        return {
            view_share_video: null,
            local_stream: null,
            
            connected_users: [-1, null, null, null, null, null],
            peer_connections: {},

        }
    },
    props: ["socket", "user_id", "sharing_user_id"],
    methods: {
        async get_stream(stream) {
            console.log(stream)
            this.view_share_video = await document.getElementById("view_share")
            this.local_stream = stream
            this.view_share_video.srcObject = this.local_stream 
        }
    },
    mounted() {
        navigator.mediaDevices.getDisplayMedia({video:true})
        .then(this.get_stream)

        this.socket.on('join', data => {
            if (this.user_id !== this.sharing_user_id) return
						console.log(data)
        }) 
    }   
}
</script>