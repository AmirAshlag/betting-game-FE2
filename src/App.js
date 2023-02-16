import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoggedOut from "./pages/LoggedOut/LoggedOut";
import Home from "./pages/Home/Home";
import { MyBets } from "./pages/MyBets/MyBets";
import NavBar from "./components/NavBar/NavBar";
import GameCard from "./components/GameCard/GameCard";

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/my-bets" element={<MyBets />}></Route>
        <Route path="/out" element={<LoggedOut />} />
        <Route path="/game/:id" element={<GameCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
