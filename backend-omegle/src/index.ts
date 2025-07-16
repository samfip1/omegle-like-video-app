import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { UserManager } from "./UserManager/Usermanager";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const userManager = new UserManager();


io.on("connection", (socket: Socket) => {
    console.log("A user logged");
    userManager.addUser("random", socket)
    socket.on("disconnect", () => {
        userManager.removeUser(socket.id) 
    })
    
});
app.get("/", (req, res) => {
    res.json({
        message: "Done"
    })
})
server.listen(3000, () => {
    console.log("Server listening on port 3000");
});
