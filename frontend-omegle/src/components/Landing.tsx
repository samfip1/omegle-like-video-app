import { useState } from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
    const [name, setName] = useState("");

    return (
        <div>
            <h2>Hello from Landing</h2>
            <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            {name ? (
                <Link to={`/room/?name=${name}`}>
                    <button>Join Room</button>
                </Link>
            ) : (
                <p>Please enter your name to join</p>
            )}
        </div>
    );
};
