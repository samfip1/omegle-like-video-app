import { useSearchParams } from "react-router-dom";

export const Room = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    if (!name) {
        return <div>Error: Please enter your name</div>;
    }
    return (
        <div>
            <h2>Hello from Room</h2>
            <p>Hello, {name}!</p>
        </div>
    );
};

