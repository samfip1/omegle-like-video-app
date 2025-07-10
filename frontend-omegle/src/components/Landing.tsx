import { useState } from "react"
import { Link } from "react-router-dom";

export const Landing = () =>{
    const [name , setName] = useState("");
    return ( 
        <div>
            Hello from Landing<br></br>
            <input type="text" onChange={(e) => {
                setName(e.target.value)
            }}>
            </input>
            <Link to={`/room/?name=${name}`}>Join Room</Link>
        </div>
    )
}