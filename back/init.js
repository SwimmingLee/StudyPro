import app from "./app"
import {connect, server} from "./socket"



const PORT = 8000;
const SOCKET_PORT = 8210

const handleListening = () => {
    console.log(`✅  Listening on : https://localhost:${PORT} ✌`);
    // connect()
}
app.listen(PORT, handleListening);



server.listen(SOCKET_PORT, function() {
    connect()
})