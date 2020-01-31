<template>
  <v-card
    id="notepad_card"
    class="notepad_card"
    ref="board"
    oncontextmenu="return false"
    ondragstart="return false"
    onselectstart="return false"
    maxHeight="640"
    maxWidth="640"
  >
    <v-textarea @keyup="typing" solo name="input-7-4" label="Solo textarea" v-model="text"></v-textarea>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  props: ["socket"],
  watch: {
    // text() {
    //   this.socket.emit("typing", {
    //     room_id : 1,
    //     text : this.text
    //   });
    // }
  },
  methods: {
    typing() {
      this.socket.emit("typing", {
        room_id: 1,
        text: this.text
      });
    }
  },
  mounted() {
    this.socket.on("typing", data => {
      console.log(data);
      this.text = data.text;
    });

    this.socket.on("clear", () => {
      console.log(window);
    });

    window.onresize = () => {
      // console.log(this.$refs.board);
      // this.canvas.width = document.getElementById("canvas_card").offsetWidth;
      // this.canvas.height = document.getElementById("canvas_card").offsetHeight;
      // console.log(this.canvas.width);
      // console.log(this.canvas.height);
    };
  }
};
</script>

<style scoped>
</style>
