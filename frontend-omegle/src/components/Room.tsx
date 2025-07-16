import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const URL = "http://localhost:3000";

export const Room = () => {
    const [searchParams] = useSearchParams();
    const [socket, setSocket] = useState<null | Socket>(null);
    const [lobby, setLobby] = useState(true);
    const name = searchParams.get("name");

    if (!name) {
        return <div>Error: Please enter your name</div>;
    }

    useEffect(() => {
        const socketInstance = io(URL, {
            autoConnect: true,
        });

        console.log("Joining with name:", name);

        setSocket(socketInstance);

        socketInstance.on("send-offer", ({ roomId }: { roomId: string }) => {
            console.log("send-offer received", roomId);
            alert("send offer please");
            setLobby(false);

            socketInstance.emit("offer", {
                sdp: "", // Replace with actual SDP if needed
                roomId,
            });
        });

        socketInstance.on("offer", ({ roomId, offer }: { roomId: string; offer: string }) => {
            console.log("offer received", roomId, offer);
            alert("received offer");
            setLobby(false);

            socketInstance.emit("answer", {
                roomId,
                sdp: "", // Replace with actual SDP if needed
            });
        });

        socketInstance.on("answer", ({ roomId, answer }: { roomId: string; answer: string }) => {
            console.log("answer received", roomId, answer);
            alert("received answer");
        });

        socketInstance.on("lobby", () => {
            console.log("You are in the lobby.");
            setLobby(true);
        });

        return () => {
            socketInstance.disconnect();
            console.log("Socket disconnected");
        };
    }, [name]);

    if (lobby) {
        return <div>Waiting to connect you to someone...</div>;
    }

    return (
        <div>
            <h2>Hello from Room</h2>
            <p>Hello, {name}!</p>

            <div>
                <video width={500} height={500} autoPlay muted></video>
                <video width={500} height={500} autoPlay></video>
            </div>
        </div>
    );
};
