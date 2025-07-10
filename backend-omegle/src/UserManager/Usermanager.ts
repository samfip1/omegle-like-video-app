import { Socket } from "socket.io"


interface Users {
    socket: Socket
    name: String
}

export class UserManager {
    private users : Users[]
    private queue : string[]
    constructor() {
        this.users = []
        this.queue = []
    }

    add_User (name: String, socket: Socket) {
        this.users.push({
            name,socket
        })
        this.queue.push(socket.id)
        this.ClearQueue()

    }
    remove_User(socketId:  string) {
        this.users = this.users.filter(x => x.socket.id === socketId)
        this.queue = this.queue.filter(x => x === socketId)
    }

    ClearQueue() {
        if(this.queue.length < 2) {
            return;
        }
        const user1 = this.users.find(x => x.socket.id === this.queue.pop())
        const user2 = this.users.find(x => x.socket.id === this.queue.pop())
    }
}