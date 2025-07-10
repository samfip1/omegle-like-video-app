import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./components/Landing";
import { Room } from "./components/Room";

function App() {

  return (
    <BrowserRouter>
      <div>
        {/* <div>
          Hello Samant
        </div> */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/room" element={<Room />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
