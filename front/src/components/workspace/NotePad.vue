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
    <v-textarea @keyup="typing" solo name="input-7-4" label="Solo textarea" v-model="text"></v-textarea>
  </v-card>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.17.0/codemirror.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.17.0/mode/javascript/javascript.js"></script>
<script>
import CodeMirror from "codemirror";
import {
  history,
  EditorState,
  EditorSelection,
  EditorView,
  keymap,
  gutter,
  baseKeymap,
  legacyMode,
  matchBrackets,
  javascript,
  specialChars,
  multipleSelections
} from "codemirror";

export default {
  data() {
    return {
      text: "",
      codeMirror: ""
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

      this.socket.emit("typing", {
        study_id: 1,
        text: this.text
      });
    }
  },
  mounted() {
    this.socket.on("typing", data => {
      // console.log(data);
      let value = data.text;
      this.codeMirror.setValue(value);
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
    console.log(this.codeMirror.onkeypress);

    this.codeMirror.on("keypress", () => {
      let value = this.codeMirror.getValue();
      
      this.socket.emit("typing", {
        study_id: 1,
        text: value
      });

      console.log("change!!");
    });
    this.codeMirror.onkeyup = () => {
      console.log("change...");
    };
  }
};
</script>

<style scoped>
</style>
