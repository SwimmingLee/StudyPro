<template>
  <v-card>
    <div id="editor" />
    <!-- <button id="download">저장하기</button> -->
  </v-card>
</template>
<script>
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
import "highlight.js/styles/github.css";
import Editor from "tui-editor";

export default {
  props: ["socket", "study_id"],

  data() {
    return {
      editor :"",
      editorText: "",
      is_change: false
    };
  },
  methods: {
    
    saveToFile_Chrome(fileName, content) {
      let blob = new Blob([content], { type: "text/plain" });
      let objURL = window.URL.createObjectURL(blob);
      
      // 이전에 생성된 메모리 해제
      if (window.__Xr_objURL_forCreatingFile__) {
        window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
      }
      window.__Xr_objURL_forCreatingFile__ = objURL;
      // let down = document.getElementById("download");
      let down = document.createElement('a');
      down.download = fileName;
      down.href = objURL;
      down.click();
    },

    isIE() {
    return (navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) ||
        navigator.userAgent.toLowerCase().indexOf("msie") !== -1;
}


  },
  mounted() {
    let editor = new Editor({
      // 에디터 인스턴스 생성
      el: document.querySelector("#editor"),
      initialEditType: "markdown",
      previewStyle: "vertical",
      height: "653px"
    });

    document.getElementById("editor").onload = () => {
      this.is_change = true;
    };

    // this.editor = document.getElementById("editor");
    // this.editor.tuiEditor('on', 'focus');
    editor.on("change", () => {
      // console.log("보낸거   ", value);

      if (this.is_change) {
        this.socket.emit("typing", {
          study_id: this.study_id,
          text: editor.getHtml()
        });
      }
    });

    // editor.on("keydown", () => {
    //   this.is_change = true;
    // });

    // editor.on("keyup", () => {
    //   this.is_change = false;
    // });

    this.socket.on("typing", data => {
      this.is_change = false;
      editor.setHtml(data.text);
      this.is_change = true;
    });

    this.socket.emit("load_pad", {
      study_id: this.study_id
    });

    this.socket.on("load_pad", data => {
      let pad_data = editor.getHtml();
      this.socket.emit("send_pad", {
        socket_id: data,
        pad_data: pad_data
      });
    });

    this.socket.on("send_pad", data => {
      this.is_change = false;
      editor.setHtml(data.pad_data);
      this.is_change = true;
    });
  
    document.getElementById("download").onclick=()=>{
      this.saveToFile_Chrome("123123",editor.getMarkdown())
    }
    
  }
};
</script>