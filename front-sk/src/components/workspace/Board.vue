<template>
  <v-card oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
    <canvas
      ref="canvas"
      @mousedown.left="mouse_down"
      @mouseup.left="mouse_up"
      @mousemove="mouse_move"
      @mouseout="mouse_out"
      @mousedown.right="eraiser_down"
      @mouseup.right="eraiser_up"
      id="canvas"
      width="640"
      height="640"
    ></canvas>

    <v-col>
    <swatches
      v-model="color"
      shapes="circles"
      colors="text-basic"
      row-length="7"
      popover-to="upper"
    />

    <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
      <template v-slot:activator="{on}">
        <v-btn class="mx-1" fab dark small :color="color" v-on="on">
          <v-icon dark>mdi-pencil</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-slider label="굵기" min="1" max="20" height="1" tick-size="3" v-model="width"></v-slider>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-menu>
    <v-btn class="mx-1" fab dark small color="primary" @click="clear">
      <v-icon dark>mdi-delete</v-icon>
    </v-btn>
    </v-col>
  </v-card>
</template>

<script>
import Swatches from "vue-swatches";
import "vue-swatches/dist/vue-swatches.min.css";

const io = require("socket.io-client");
var socket = null;
window.onsize = function() {
  alert("!");
};

export default {
  components: {
    Swatches
  },
  data() {
    return {
      width: 5,
      color: "#000000",
      isDown: false, // 마우스 버튼을 눌렀나 안 눌렀나
      isClear: false,
      old_x: "",
      old_y: "",
      new_x: "",
      new_y: "",
      exceptions: ["#000000"]
      // canvas : document.getElementById("canvas"),
      // context:'',        //Canvas 객체 추출
    };
  },
  methods: {
    mouse_down(event) {
      this.isDown = true;
      this.old_x = event.offsetX;
      this.old_y = event.offsetY;

      socket.emit("draw", {
        room_id: 1,
        width: this.width,
        color: this.color,
        x1: this.old_x,
        y1: this.old_y,
        x2: this.old_x + 1,
        y2: this.old_y + 1
      });
    },
    mouse_up() {
      this.isDown = false;
    },
    eraiser_down() {
      this.isClear = true;
      this.old_x = event.offsetX;
      this.old_y = event.offsetY;
    },
    eraiser_up() {
      this.isClear = false;
    },
    mouse_move(event) {
      if (!(this.isDown || this.isClear)) {
        return;
      }

      let color = "";
      let width = "";
      if (this.isDown) {
        color = this.color;
        width = this.width;
      } else if (this.isClear) {
        color = "white";
        width = 40;
      }

      this.new_x = event.offsetX;
      this.new_y = event.offsetY;

      socket.emit("draw", {
        room_id: 1,
        width: width,
        color: color,
        x1: this.old_x,
        y1: this.old_y,
        x2: this.new_x,
        y2: this.new_y
      });
      this.old_x = this.new_x;
      this.old_y = this.new_y;
    },
    mouse_out() {
      this.isDown = false;
    },
    clear() {
      
      socket.emit("clear", {
        room_id: 1
      });
    }
  },
  mounted() {
    // console.log(this.$refs.canvas);
    // this.ctx = this.$refs.canvas.getContext('2d');
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    socket.on("line", data => {
      this.context.lineWidth = data.width;
      this.context.strokeStyle = data.color;
      this.context.beginPath();
      this.context.moveTo(data.x1, data.y1);
      this.context.lineTo(data.x2, data.y2);
      this.context.stroke();
    });

    socket.on('clear', () => {
      // console.log('on clear');
      
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    });
    window.onsize = function() {
      // console.log("??");
    };
  },
  created() {
    socket = io.connect("http://70.12.246.89:8210", {
      transports: ["websocket"]
    });
    socket.emit("join", 1);
  }
};
</script>
