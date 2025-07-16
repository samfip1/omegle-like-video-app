import { useEffect, useRef, useState } from "react"
import { Room } from "./Room";

export const Landing = () => {
    const [name, setName] = useState("");
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [joined, setJoined] = useState(false);

    const getCam = async () => {
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        // MediaStream
        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]
        setLocalAudioTrack(audioTrack);
        setlocalVideoTrack(videoTrack);
        if (!videoRef.current) {
            return;
        }
        videoRef.current.srcObject = new MediaStream([videoTrack])
        videoRef.current.play();
        // MediaStream
    }

    useEffect(() => {
        if (videoRef && videoRef.current) {
            getCam()
        }
    }, [videoRef]);

    if (!joined) {
        return (
        <div>
            <h2>Hello from Landing</h2>
            {/* <center><video autoPlay ref={videoRef}></video></center> */}
            <center>
            <video
                autoPlay
                ref={videoRef}
                style={{ width: "100%", maxWidth: "1000px", height: "auto" }}
            ></video>
            </center>

            <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            {name ? (
                    <button onClick={() => {
                        setJoined(true)
                    }}>Join Room</button>
            ) : (
                <p>Please enter your name to join</p>
            )}
        </div>
    );
    }

    return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
}