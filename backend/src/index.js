import express from "express";
import http from "http";
import { Server as socketServer } from "socket.io";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PATCH'],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
    credentials: true
}))

const server = http.createServer(app);
const io = new socketServer({
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST', 'PATCH'],
        allowedHeaders: ["Content-Type", "Authorization"],
        optionsSuccessStatus: 200,
        credentials: true
    }
});

io.on("connection", (socket) => {
   
    console.log("usuario conectado!", socket.id);
    
    socket.emit("notification" , {
        message: "Bienvenido!!!",
    });

    setInterval(() => {
        socket.emit("mensaje", {
            message: "Hola mucha veces!!!"
        });
    }, 5000);

    socket.disconnect("desconectar", () => {
        console.log("Usuario desconectado!", socket.id);
    });

});


app.get("/", (req, res) => {
    
    res.send("Hola");

});



server.listen(PORT, console.log(`Server running on http://localhost:${PORT}`));
