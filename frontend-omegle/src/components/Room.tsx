import { useEffect, useState } from "react";
import { createRoutesFromElements, useSearchParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const URL = "http://localhost:3000"
export const Room = () => {
    const [searchParams] = useSearchParams();
    const [socket , setSocket] = useState<null | Socket>(null);
    const name = searchParams.get("name");

    if (!name) {
        return <div>Error: Please enter your name</div>;
    }
    useEffect(() => {
        const socket = io(URL, {
            autoConnect: true
        });
        socket.on("send-offer", ({roomId}: {roomId: string}) => {
            console.log(roomId)
            alert("send offer please")
        })
        socket.on("offer", ({roomId, offer}: {roomId: string, offer: string}) => {
            console.log(roomId, offer)
            alert("send offer please")
        })
        socket.on("answer", ({roomId, answer}: {roomId: string, answer: string}) => {
            console.log(roomId, answer)
            alert("send Answer please")
        })
    }, [name])
    return (
        <div>
            <h2>Hello from Room</h2>
            <p>Hello, {name}!</p>
        </div>
    );
};

