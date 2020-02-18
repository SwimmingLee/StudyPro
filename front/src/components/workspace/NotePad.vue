<template>
  <v-card>
    <div id="editor" />
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-btn class="btns"  id="download" v-on="on" @click="click_down" icon>
            <v-icon color="black">save</v-icon>
        </v-btn>
      </template>
      <span>Save</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-btn class="btns"  id="upload" @click="click_upload" v-on="on" icon>
        <v-icon color="black">folder_open</v-icon>
        </v-btn>
      </template>
      <span>Load</span>
    </v-tooltip>

    <input id="file_load" type="file" accept=".txt, .md" @change="load_file" hidden />
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
      editor: "",
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
      let down = document.createElement("a");
      down.download = fileName;
      down.href = objURL;
      down.click();
    },
    isIE() {
      return (
        (navigator.appName === "Netscape" &&
          navigator.userAgent.search("Trident") !== -1) ||
        navigator.userAgent.toLowerCase().indexOf("msie") !== -1
      );
    },

    click_down() {
      let today = new Date();
      let year = String(today.getFullYear());
      let month = String(today.getMonth() + 1);
      let day = String(today.getDay());
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }

      let title = year + month + day;
      this.saveToFile_Chrome(title, this.editor.getMarkdown());
    },

    async load_file(event) {
      this.editor.setValue("");
      let value = await event.target.files[0].text();
      this.editor.setValue(value);
      this.socket.emit("typing", {
        study_id: this.study_id,
        text: this.editor.getValue()
      });
    },
    click_upload() {
      document.getElementById("file_load").click();
    }
  },
  mounted() {
    this.editor = new Editor({
      // 에디터 인스턴스 생성
      el: document.querySelector("#editor"),
      initialEditType: "wysiwyg",
      previewStyle: "vertical",
      height: "653px"
    });

    document.getElementById("editor").onload = () => {
      this.is_change = true;
    };

    this.editor.on("change", () => {
      if (this.is_change) {
        this.socket.emit("typing", {
          study_id: this.study_id,
          text: this.editor.getValue()
        });
      }
    });

    this.socket.on("typing", data => {
      this.is_change = false;
      this.editor.setValue(data.text);
      this.is_change = true;
    });

    this.socket.emit("load_pad", {
      study_id: this.study_id
    });

    this.socket.on("load_pad", data => {
      let pad_data = this.editor.getValue();
      this.socket.emit("send_pad", {
        socket_id: data,
        pad_data: pad_data
      });
    });

    this.socket.on("send_pad", data => {
      this.is_change = false;
      this.editor.setValue(data.pad_data);
      this.is_change = true;
    });
  }
};
</script>
<style  scoped>
#editor {
  z-index: 1;
}

.btns {
  top: -2px;
  position: absolute;
  z-index: 2;
  font-family: fantasy;
  font-weight: bold;
}
#upload {
  left: 1070px;
}
#download {
  left: 1105px;
}
</style>
