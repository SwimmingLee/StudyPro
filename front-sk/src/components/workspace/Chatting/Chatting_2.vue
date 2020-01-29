<template>
  <div>
    <div>
      <textarea id="chatLog" class="textarea" readonly></textarea>
    </div>
    <form id="chat">
      <input id="name" class="name" type="text" readonly />
      <input id="message" class="message" type="text" />
      <input type="submit" class="chat" value="chat" />
    </form>
    <v-container class="pa-1">
    <v-textarea outlined v-model="textarea" disabled autofocus></v-textarea>
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
      @keyup.13="sendMessage"
    ></v-text-field>
  </v-container>
  </div>

</template>

<script src="/socket.io/socket.io.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.js"></script>


<script>
const io = require("socket.io-client");
$(document).ready(function() {
  var socket = io.connect("http://70.12.246.89:8210", {transports:['websocket']});
      socket.emit('join',1);
      $('#chat').on('submit', function(e){
        socket.emit('send message', {
          room_id : 1,
          name : $('#name').val(),
          message :  $('#message').val()
        });
        $('#message').val("");
        $("#message").focus();
        e.preventDefault();
      });

      socket.on('receive message', function(msg){
        $('#chatLog').append(msg+'\n');
        $('#chatLog').scrollTop($('#chatLog')[0].scrollHeight);
      });

      socket.on('change name', function(name){
        $('#name').val(name);
      });
});

export default {
  data() {
    return {
      msg: "",
      textarea: "",
      password: "Password",
      show: false,
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
        "mdi-thumb-up",
      ]
    };
  },

  computed: {
    icon() {
      return this.icons[this.iconIndex];
    }
  },

  methods: {
    submitMessageFunc() {
      if (this.msg.length === 0) return false;
      this.$emit("submitMessage", this.msg);
      this.msg = "";
      return true;
    },
    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
      this.textarea += this.msg + "\n";
      this.resetIcon();
      this.clearMessage();
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
  }
};
</script>


    <style scoped>
      .chat_log{ width: 95%; height: 200px; }
      .name{ width: 10%; }
      .message{ width: 70%; }
      .chat{ width: 10%; }
    </style>