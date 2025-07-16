import { Users } from "./Usermanager";

let GLOBAL_ROOM_ID = 1;

interface roommanager {
    user1: Users,
    user2: Users
}

export class RoomManager {
    private rooms: Map<string, roommanager>

    constructor() {
        this.rooms = new Map<string, roommanager>()
    }
    generate() {
        return GLOBAL_ROOM_ID++;
    }
    createRoom(user1: Users, user2: Users) {
        const roomid = this.generate().toString();
        this.rooms.set(roomid.toString(), {
            user1,
            user2
        })

        user1.socket.emit("send-offer", {
        roomId: roomid
    });
    console.log(`Sending offer to: ${user1.socket.id}, roomId: ${roomid}`);


    }

    onOffer(roomid: string, sdp: string) {
        const user2 = this.rooms.get(roomid)?.user2;
        user2?.socket.emit("offer", {
            sdp,
            roomid
        })
    }

    onAnswer(roomid: string, sdp: string) {
        const user1 = this.rooms.get(roomid)?.user1;
        user1?.socket.emit("answer", {
            sdp,
            roomid
        })
    }

    // deleteRoom(roomid) {
    //     const room = this.rooms.find
    // }

}