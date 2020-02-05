import app from "./app"
import {connect, server} from "./socket"


const PORT = 8000;

const handleListening = () => {
    console.log(`✅  Listening on : http://localhost:${PORT} ✌`);
    // connect()
}
app.listen(PORT, handleListening);


server.listen(8210, function() {
    connect()
})