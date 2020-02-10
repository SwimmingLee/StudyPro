<template>
  <v-container>
    <v-card outlined class="pt-3 px-3">
      <v-card  height="200" class="chat overflow-y-auto mx-1 pa-2" outlined autofocus style="background-color: #9bbbd4">
        <v-list class="ma-0 pa-0" ref="chat" outlined v-for="(data, index) in messages" :key="index" :align="'나' === data[0] ? `right` : data[0] ? `left` : 'center'" style="background-color: #9bbbd4">
          <font style="display : block" size="2">{{ data[0] === '나' ? '' : data[0] }}</font>
            <font size="2">
              <div v-for="(message,in_index) in data[1]" :key="`${index}-${in_index}`">
              <span class="px-2 my-1 py-1" :style="data[0] === '나' ? 'background-color: #fef01b' : data[0] ? 'background-color: #ffffff' : 'background-color: #9bbbd4'"  size="2">
              {{message}}
              </span>
              </div>
            </font>
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
  props: ["socket", "user", "study_id"],
  data() {
    return {
      name: this.user.user_nickname,
      prvUsr: "",
      index: 0,
      message: "",
      messages: [],
      length: 0,
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
        user_nickname: this.user.user_nickname,
        message: this.message,
        study_id: this.study_id
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
    }
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
      data.user_nickname = data.user_nickname === this.user.user_nickname ? '나' : data.user_nickname
      let tmp = data.user_nickname;
      if (data.user_nickname === this.prvUsr) {
        this.messages[this.length - 1][1].push(data.message)
        return
      }
      this.prvUsr = tmp;
      this.length = this.messages.push([data.user_nickname, [data.message]])
    });
    this.socket.on("join", data => {
      this.prvUsr = '공지'
      const message = data.user_id === this.user.user_id ? '채팅방에 입장하였습니다' : `${data.user_nickname}님이 입장하였습니다`
      this.messages.push(['', [message]])
    })
    this.socket.on("leave", data => {
      this.prvUsr = '공지'
      const message = data.user_id === this.user.user_id ? '채팅방에 입장하였습니다' : `${data.user_nickname}님이 퇴장하였습니다`
      this.messages.push(['', [message]])
    })
  }
};
</script>

<style scoped>
  span {
    display: inline-block;
    border-radius: 5px;
  }
</style>