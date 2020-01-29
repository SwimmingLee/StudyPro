<template>
  <canvas
    ref="canvas"
    @mousedown="mouse_down"
    @mouseup="mouse_up"
    @mousemove="mouse_move"
    @mouseout ="mouse_out"
    id="canvas"
    width="640"
    height="640"
  ></canvas>
</template>

<script>
const io = require("socket.io-client");
var socket = null;

export default {
  data() {
    return {
      width: 5,
      color: "#000000",
      isDown: false, // 마우스 버튼을 눌렀나 안 눌렀나
      old_x: "",
      old_y: "",
      new_x: "",
      new_y: ""
      // canvas : document.getElementById("canvas"),
      // context:'',        //Canvas 객체 추출
    };
  },
  methods: {
    mouse_down(event) {
      this.isDown = true;
      this.old_x = event.offsetX;
      this.old_y = event.offsetY;
      console.log(this.old_x, " ", this.old_y);
    },
    mouse_up() {
      this.isDown = false;
      console.log(this.old_x, " ", this.old_y);
    },
    mouse_move(event) {
      if (this.isDown) {
        this.new_x = event.offsetX;
        this.new_y = event.offsetY;

        socket.emit("draw", {
          room_id: 1,
          width: this.width,
          color: this.color,
          x1: this.old_x,
          y1: this.old_y,
          x2: this.new_x,
          y2: this.new_y
        });
        this.old_x = this.new_x;
        this.old_y = this.new_y;
      }
    },
    mouse_out(){
      this.isDown = false;
    }
  },
  mounted() {
    // console.log(this.$refs.canvas);
    // this.ctx = this.$refs.canvas.getContext('2d');
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    socket.on("line", (data)=> {
      this.context.lineWidth = data.width;
      this.context.strokeStyle = data.color;
      this.context.beginPath();
      this.context.moveTo(data.x1, data.y1);
      this.context.lineTo(data.x2, data.y2);
      this.context.stroke();
    });
  },
  created() {
    socket = io.connect("http://70.12.246.89:8210", {
      transports: ["websocket"]
    });
    socket.emit("join", 1);
  }
};
</script>
