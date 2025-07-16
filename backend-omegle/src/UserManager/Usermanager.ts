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
        socket.send("lobby");
        this.ClearQueue()
        this.initialHandlers(socket)

    }
    remove_User(socketId:  string) {
        const user = this.users.find(x => x.socket.id === socketId )
        if(!user) {

        }
        this.users = this.users.filter(x => x.socket.id !== socketId)
        this.queue = this.queue.filter(x => x === socketId)
        // this.queue = this.queue.filter(x => x === socketId)
    }

    ClearQueue() {
        console.log("Inside Clear Queue")
        console.log(this.queue.length)
        if(this.queue.length < 2) {
            return;
        }

        console.log(this.users)
        console.log(this.queue)
        const id1 = this.queue.pop()
        const id2 = this.queue.pop()
        const user1 = this.users.find(x => x.socket.id === id1)
        const user2 = this.users.find(x => x.socket.id === id2)
        console.log(user1)
        console.log(user2)
        if(!user1 || !user2) {
            return;
        }
        console.log("Creating Room")
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