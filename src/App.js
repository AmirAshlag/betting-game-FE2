import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoggedOut from "./pages/LoggedOut/LoggedOut";
import Home from "./pages/Home/Home";
import { MyBets } from "./pages/MyBets/MyBets";
import NavBar from "./components/NavBar/NavBar";
// import { Datepicker, Eventcalendar } from "@mobiscroll/react";
// import "@mobiscroll/react/dist/css/mobiscroll.min.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar path="/" />
      <Routes>
        <Route path="/" element={<Home />}></Route>
<<<<<<< HEAD
        <Route path="/my-bets" element={<MyBets />}></Route>
        <Route path="/" element={<LoggedOut />} />
=======
        <Route path="/login" element={<LoggedOut />} />
>>>>>>> main
      </Routes>
    </BrowserRouter>
  );
}

export default App;
