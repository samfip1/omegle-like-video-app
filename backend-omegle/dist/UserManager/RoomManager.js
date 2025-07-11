"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
let GLOBAL_ROOM_ID = 1;
class RoomManager {
    constructor() {
        this.rooms = new Map();
    }
    generate() {
        return GLOBAL_ROOM_ID++;
    }
    createRoom(user1, user2) {
        const roomid = this.generate();
        this.rooms.set(roomid.toString(), {
            user1,
            user2
        });
        user1.socket.emit("new-room", {
            type: "send-offer"
        });
    }
    onOffer(roomid, sdp) {
        var _a;
        const user2 = (_a = this.rooms.get(roomid)) === null || _a === void 0 ? void 0 : _a.user2;
        user2 === null || user2 === void 0 ? void 0 : user2.socket.emit("offer", {
            sdp
        });
    }
    onAnswer(roomid, sdp) {
        var _a;
        const user1 = (_a = this.rooms.get(roomid)) === null || _a === void 0 ? void 0 : _a.user1;
        user1 === null || user1 === void 0 ? void 0 : user1.socket.emit("answer", {
            sdp
        });
    }
}
exports.RoomManager = RoomManager;
