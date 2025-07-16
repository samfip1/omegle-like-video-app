"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const Usermanager_1 = require("./UserManager/Usermanager");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const host = '10.193.49.25';
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
const userManager = new Usermanager_1.UserManager();
io.on("connection", (socket) => {
    console.log("A user logged");
    userManager.addUser("random", socket);
    socket.on("disconnect", () => {
        userManager.removeUser(socket.id);
    });
});
app.get("/", (req, res) => {
    res.json({
        message: "Done"
    });
});
app.listen(3000, '0.0.0.0', () => {
    console.log("Server running on http://0.0.0.0:3000");
});
