import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoggedOut from "./pages/LoggedOut/LoggedOut";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoggedOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
