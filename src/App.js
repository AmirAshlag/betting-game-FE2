import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginOrSignup from "./pages/LoggedOut/LoginOrSignup";
import Home from "./pages/Home/Home";
import Marketplace from "./pages/Marketplace/Marketplace";
import { MyBets } from "./pages/MyBets/MyBets";
import NavBar from "./components/NavBar/NavBar";
import GameCard from "./components/GameCard/GameCard";
import UserContext from "./Context/UserContext/UserContext";
import Login from "./pages/Login/Login";

function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/my-bets" element={<MyBets />}></Route>
          <Route path="/marketplace" element={<Marketplace />}></Route>
          <Route path="/login" element={<LoginOrSignup />} />
          <Route path="/game/:id" element={<GameCard />} />
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
