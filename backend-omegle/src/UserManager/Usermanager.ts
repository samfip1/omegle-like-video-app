import { Socket } from "socket.io"
import { RoomManager } from "./RoomManager";


export interface Users {
    socket: Socket
    name: String
}

let GLOBAL_ROOM_ID = 1;
export class UserManager {
    private users : Users[]
    private queue : string[]
    private roomManager: RoomManager;
    constructor() {
        this.users = []
        this.queue = []
        this.roomManager = new RoomManager()
    }

    add_User (name: String, socket: Socket) {
        this.users.push({
            name,socket
        })
        this.queue.push(socket.id)
        this.ClearQueue()
        this.initialHandlers(socket)

    }
    remove_User(socketId:  string) {
        this.users = this.users.filter(x => x.socket.id !== socketId)
        this.queue = this.queue.filter(x => x === socketId)
        // this.queue = this.queue.filter(x => x === socketId)
    }

    ClearQueue() {
        if(this.queue.length < 2) {
            return;
        }

        const user1 = this.users.find(x => x.socket.id === this.queue.pop())
        const user2 = this.users.find(x => x.socket.id === this.queue.pop())
        if(!user1 || !user2) {
            return;
        }
        const room = this.roomManager.createRoom(user1,user2)
        this.ClearQueue()
    }

    initialHandlers(socket: Socket) {
        socket.on("offer", ({sdp, roomId}: {sdp: string, roomId: string}) => {
            this.roomManager.onOffer(roomId, sdp);
        })
        socket.on("answer", ({sdp, roomId}: {sdp: string, roomId: string}) => {
            this.roomManager.onAnswer(roomId, sdp);
        })
    }

}