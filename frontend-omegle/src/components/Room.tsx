
import { useSearchParams } from "react-router-dom"

export const Room = () => {
    const [searchParams, setSearchParams] = useSearchParams("");
    const name = searchParams.get('name')
    if(!name) {
        return "Error: Please Enter your name"
    }
    setSearchParams(name)
    return (
        <div>
            Hello from Room <br></br>
            hello {searchParams}
        </div>
    )
}