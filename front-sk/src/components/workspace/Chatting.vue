<template>
  <v-container>
    <v-textarea outlined disabled autofocus>
      <v-text-field>
      <v-list v-for="(msg, index) in messages" :key="index">{{ msg }}</v-list>
      </v-text-field>
    </v-textarea>
    <v-text-field
      outlined
      v-model="msg"
      append-outer-icon="mdi-send"
      :append-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
      :prepend-icon="icon"
      clear-icon="mdi-close-circle"
      clearable
      label="전송할 메세지를 입력하세요."
      type="text"
      @click:append="toggleMarker"
      @click:append-outer="sendMessage"
      @click:prepend="changeIcon"
      @click:clear="clearMessage"
      @keyup.enter="sendMessage"
    ></v-text-field>
  </v-container>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      name: "room",
      msg: "",
      messages: [],
      socket: "",
      // socket: io("http://70.12.246.89:8210"),
      marker: true,
      iconIndex: 0,
      icons: [
        "mdi-emoticon",
        "mdi-emoticon-cool",
        "mdi-emoticon-dead",
        "mdi-emoticon-devil",
        "mdi-emoticon-excited",
        "mdi-emoticon-happy",
        "mdi-emoticon-neutral",
        "mdi-emoticon-poop",
        "mdi-emoticon-sad",
        "mdi-emoticon-tongue",
        "mdi-heart",
        "mdi-star",
        "mdi-cached",
        "mdi-thumb-up"
      ]
    };
  },
  methods: {
    sendMessage() {
      this.socket.emit("send message", {
        name: this.name,
        msg: this.msg,
        room_id: 1,
      });
      this.resetIcon();
      this.clearMessage();
    },
    toggleMarker() {
      this.marker = !this.marker;
    },
    clearMessage() {
      this.msg = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    }
  },
  computed: {
    icon() {
      return this.icons[this.iconIndex];
    }
  },
  created() {
    this.socket = io.connect("http://70.12.246.89:8210", {transports:['websocket']});
    this.socket.emit("join", 1);
  },
  mounted() {
    this.socket.on("receive message", (msg) => {
      this.messages.push(msg + '\n');
    });
  },
};
</script>