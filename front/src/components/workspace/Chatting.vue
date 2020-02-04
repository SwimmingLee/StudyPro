<template>
  <v-container>
    <v-card outlined class="pt-3 px-3">
      <v-card height="200" class="chat overflow-y-auto mx-1 pa-2" outlined autofocus align="left">
        <v-list ref="chat" outlined v-for="(data, index) in messages" :key="index">
          {{ data.user_nickname }}<v-card outlined class="ma-0 pa-1">{{ data.message }}</v-card>
        </v-list>
      </v-card>
      <v-text-field
        class="mt-5"
        outlined
        dense
        v-model="message"
        append-outer-icon="mdi-send"
        :prepend-icon="icon"
        clear-icon="mdi-close-circle"
        clearable
        label="전송할 메세지를 입력하세요."
        type="text"
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
      name: this.$store.getters.userNickname,
      prvUsr: "",
      index: 0,
      message: "",
      messages: [],
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
      if (this.message.length === 0) return;
      this.socket.emit("send message", {
        user_nickname: "김현철",
        message: this.message,
        study_id: 1
      });
      this.resetIcon();
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
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
    this.socket.on("receive message", data => {
      let tmp = data.user_nickname;
      if(data.user_nickname === this.prvUsr) {
        data.user_nickname = "";
      }
      this.prvUsr = tmp;
      this.messages.push(data);
    });
  }
};
</script>