import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import GameList from "../../components/GameList/GameList";
import "./Home.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

export default function Home() {
  const [date, setDate] = useState(false);
   const [games, SetGames] = useState("");

   useEffect(() => {
     axios.get(`http://localhost:8080/games/ByDate/${date}`).then((res) => {
       console.log(res.data.response);
       SetGames(res.data.response);
     });
   }, [date]);

  return (
    <div className="homeContainer">
      <div className="homeTitles">
        <div className="header">
          <h1>Bet Game</h1>
        </div>
        <div className="expSection">
          <div className="welcomeTitle">
            <h5>Welcome to Bet Game!</h5>
          </div>
          <div className="welcomeBody">
            <h6>
              choose your favorite sport and start betting with your friends!
            </h6>
          </div>
        </div>
      </div>
      <div className="calender">
        <Calendar
          onClickDay={(e) => {
            setDate(e);
            console.log(e);
          }}
        />
      </div>
      <div className="chooseContainer">
        <Dropdown>
          <div className="justify-content-md-center">
            <div className="chooseSport">
              <span className="chooseTitle">
                <h5>Sport Category</h5>
              </span>
              <span className="chooseButton">
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                ></Dropdown.Toggle>
              </span>
            </div>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">NBA</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Champions League</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Sport3</Dropdown.Item>
            </Dropdown.Menu>
          </div>
        </Dropdown>
      </div>

      <div className="gameList">
        {date && <GameList date={date} games={games} />}
      </div>
    </div>
  );
}
