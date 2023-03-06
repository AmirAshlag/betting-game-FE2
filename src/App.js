import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginOrSignup from "./pages/LoggedOut/LoginOrSignup";
import Home from "./pages/Home/Home";
import Marketplace from "./pages/Marketplace/Marketplace";
import { MyBets } from "./pages/MyBets/MyBets";
import NavBar from "./components/NavBar/NavBar";
import GameCard from "./components/GameCard/GameCard";
import UserContext from "./Context/UserContext/UserContext";
import UserRoute from "./components/NavBar/UserRoute";

function App() {
  return (
    <UserContext>
      <BrowserRouter>
        {<NavBar />}
        <Routes>
          <Route
            path="/home"
            element={
              <UserRoute>
                <Home />
              </UserRoute>
            }
          ></Route>
          <Route
            path="/my-bets"
            element={
              <UserRoute>
                <MyBets />
              </UserRoute>
            }
          ></Route>
          <Route
            path="/marketplace"
            element={
              <UserRoute>
                <Marketplace />
              </UserRoute>
            }
          ></Route>
          <Route path="/" element={<LoginOrSignup />} />
          <Route
            path="/game/:id"
            element={
              <UserRoute>
                <GameCard />
              </UserRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
