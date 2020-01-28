<template>
    <table border="10">
        <tr>
            <td rowspan="3">
                <!-- 캔버스 -->
                <canvas
                    v-on:mousedown.left="mouse_down"
                    v-on:mouseup.left="mouse_up"
                    v-on:mousemove="mouse_move"
                    id="canvas"
                    width="600"
                    height="400"></canvas>
            </td>
            <td height="200">
                <!-- 색상 선택기 -->
                <div id="colorpicker"></div>
            </td>
        </tr>
        <tr>
            <td height="25">
                <!-- 슬라이더: 펜 두께 -->
                <div id="slider"></div>
            </td>
        </tr>
        <tr>
            <td style="background: orange;"></td>
        </tr>
    </table>
</template>

<script src="//code.jquery.com/jquery-1.11.1.js"></script>

<script>
    const io = require("socket.io-client");
    var socket = null;
    function Point(event, target) {
        // Point 생성자 함수 선언
        this.x = event.pageX - $(target)
            .position()
            .left; // 파폭은 offsetX 속성을 지원하지 않으므로 이런 방식의 코드를 사용함
        this.y = event.pageY - $(target)
            .position()
            .top;
    }

    export default {
        data() {
            return {
                width = 5,
                color = "#000000",
                isDown = false, // 마우스 버튼을 눌렀나 안 눌렀나
                newPoint,
                oldPoint
            };
        },
        methods: {
            mouse_down() {
                this.isDown = true;
                oldPoint = new Point(event, this); // 현재 마우스 위치를 기록
            },
            mouse_up() {
                this.isDown = false;
            },
            mouse_move() {
                if (isDown) {
                    newPoint = new Point(event, this);

                    socket.emit("draw", {
                        room_id: 1,
                        width: this.width,
                        color: this.color,
                        x1: oldPoint.x,
                        y1: oldPoint.y,
                        x2: newPoint.x,
                        y2: newPoint.y
                    });

                    oldPoint = newPoint;
                }
            }
        },
        mounted() {
            socket.on("line", function (data) {
                context.lineWidth = data.width;
                context.strokeStyle = data.color;
                context.beginPath();
                context.moveTo(data.x1, data.y1);
                context.lineTo(data.x2, data.y2);
                context.stroke();
            });

            // UI를 구성
            $("#colorpicker").farbtastic(function (data) {
                // Farbtastic Color Picker
                color = data;
            });

            $("#slider").slider({
                max: 20,
                min: 1,
                value: 5,
                change: function (event, ui) {
                    width = ui.value;
                }
            });

        },
        created() {
            socket = io.connect("http://70.12.246.89:8210", {transports: ["websocket"]});
            socket.emit("join", 1);
        }
    };
</script>


<script>
    // const io = require("socket.io-client"); $(document).ready(function() {
    // function Point(event, target) {      Point 생성자 함수 선언     this.x = event.pageX
    // - $(target).position().left;  파폭은 offsetX 속성을 지원하지 않으므로 이런 방식의 코드를 사용함
    // this.y = event.pageY - $(target).position().top;   }   var canvas =
    // document.getElementById("canvas");  Canvas 객체 추출   var context =
    // canvas.getContext("2d");    변수 선언   var width = 5;   var color = "#000000";
    // var isDown = false;  마우스 버튼을 눌렀나 안 눌렀나   var newPoint, oldPoint;    이벤트 연결
    // canvas.onmousedown = function(event) {     isDown = true;  눌렀다     oldPoint =
    // new Point(event, this);  현재 마우스 위치를 기록   };   canvas.onmouseup = function() {
    // isDown = false;   };   canvas.onmousemove = function(event) {     if (isDown)
    // {       newPoint = new Point(event, this);       socket.emit("draw", {
    // room_id: 1,         width: width,         color: color,         x1:
    // oldPoint.x,         y1: oldPoint.y,         x2: newPoint.x,         y2:
    // newPoint.y       });       oldPoint = newPoint;     }   };   var socket =
    // io.connect("http://70.12.246.89:8210", {     transports: ["websocket"]   });
    // 소켓 이벤트를 연결   socket.emit("join", 1);   socket.on("line", function(data) {
    // context.lineWidth = data.width;     context.strokeStyle = data.color;
    // context.beginPath();     context.moveTo(data.x1, data.y1);
    // context.lineTo(data.x2, data.y2);     context.stroke();   });    UI를 구성
    // $("#colorpicker").farbtastic(function(data) {      Farbtastic Color Picker
    // color = data;   });   $("#slider").slider({     max: 20,     min: 1,
    // value: 5,     change: function(event, ui) {       width = ui.value;     }
    // }); });
    //
</script>