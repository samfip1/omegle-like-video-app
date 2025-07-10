
import { useSearchParams } from "react-router-dom"

export const Room = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get('name')
    return (
        <div>
            Hello from Room <br></br>
            hello {name}
        </div>
    )
}