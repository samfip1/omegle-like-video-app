import { Users } from "./Usermanager";

let GLOBAL_ROOM_ID = 1;

interface roommanager {
    user1: Users,
    user2: Users
}

export class RoomManager {
    private rooms: Map<String, roommanager>

    constructor() {
        this.rooms = new Map<String, roommanager>()
    }
    generate() {
        return GLOBAL_ROOM_ID++;
    }
    createRoom(user1: Users, user2: Users) {
        const roomid = this.generate();
        this.rooms.set(roomid.toString(), {
            user1,
            user2
        })

        user1.socket.emit("new-room", {
            type: "send-offer"
        })
    }

    onOffer(roomid: string, sdp: string) {
        const user2 = this.rooms.get(roomid)?.user1;
        user2?.socket.emit("offer", {
            sdp
        })
    }

    onAnswer(roomid: string, sdp: string) {
        const user1 = this.rooms.get(roomid)?.user1;
        user1?.socket.emit("offer", {
            sdp
        })
    }

}