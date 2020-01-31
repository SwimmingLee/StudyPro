<template>
  <v-container>
    <v-card outlined class="pt-3 px-3">
      <v-card
        height="200"
        class="chat overflow-y-auto mx-1 pa-3"
        outlined
        autofocus
        align="left"
      >
        <v-list
          ref="chat"
          class="pa-1"
          outlined
          v-for="(message, index) in messages"
          :key="index"
        >{{ message.name }} : {{message.msg}}</v-list>
      </v-card>
      <v-text-field
        class="mt-5"
        outlined
        dense
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
        @keyup.esc="clearMessage"
        @keyup.enter="sendMessage"
      ></v-text-field>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ["socket"],
  data() {
    return {
      name: "",
      index: 0,
      msg: "",
      messages: [],
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
      if (this.msg.length === 0) return;
      this.socket.emit("send message", {
        name: this.name,
        msg: this.msg,
        room_id: 1
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
    },
  },
  computed: {
    icon() {
      return this.icons[this.iconIndex];
    }
  },

  updated() {
    var chat = document.querySelector(".chat");
    chat.scrollTop = chat.scrollHeight;
  },
  mounted() {
    this.socket.on("join", usrName => {
      this.name = usrName;
    });
    this.socket.on("receive message", msg => {
      
      this.messages.push(msg);
    });
  }
};
</script>