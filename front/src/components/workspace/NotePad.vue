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
    <textarea @keyup="typing" v-model="text" id="codemirror_pad"></textarea>
    <!-- <v-textarea @keyup="typing" solo name="input-7-4" label="Solo textarea" v-model="text"></v-textarea> -->
  </v-card>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.17.0/codemirror.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.17.0/mode/javascript/javascript.js"></script>
<script>
import CodeMirror from "codemirror"
import dialog from "codemirror"
import mode from "codemirror"
import javascript from "codemirror"



console.log(mode);


export default {
  data() {
    return {
      text: "",
      codeMirror: "",
      is_change: false
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
      console.log(this.codeMirror.getValue());

      // this.socket.emit("typing", {
      //   study_id: 1,
      //   text: this.text
      // });
      alert("안돼!");
    }
  },
  mounted() {
    this.socket.on("typing", data => {
      console.log("받은거", data);
      let value = data.text;
      this.codeMirror.setValue(value);
      let line_count = this.codeMirror.lineCount();
      this.codeMirror.setCursor(line_count);
    });

    this.codeMirror = CodeMirror.fromTextArea(
      document.getElementById("codemirror_pad"),
      {
        lineNumbers: true,
        mode: "javascript"
      }
    );

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

    this.codeMirror.on("change", () => {
      console.log("바뀐다");

      // console.log("보낸거   ", value);
      if (this.is_change) {
        let value = this.codeMirror.getValue();
        this.socket.emit("typing", {
          study_id: 1,
          text: value
        });
      }
    });

    this.codeMirror.on("keydown", () => {
      this.is_change = true;
    });

    this.codeMirror.on("keyup", () => {
      this.is_change = false;
    });
  }
};
</script>

<style scoped>
</style>
