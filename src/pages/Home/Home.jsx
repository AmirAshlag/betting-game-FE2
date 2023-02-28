import React, { useEffect, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import GameList from "../../components/GameList/GameList";
import "./Home.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
export default function Home() {
  const [date, setDate] = useState(false);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/games/ByDate/${date}`).then((res) => {
      console.log(res.data.response);
      setGames(res.data.response);
    });
  }, [date]);
  const getGamesPerTeam = (teamId) => {
    fetch(`http://localhost:8080/games/teams/${teamId}`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.response);
      });
  };
  return (
    <div className="homeContainer">
      <h1 className="home-title">Betting Game</h1>
      <h6>
        choose a game and start
        <br /> betting with your friends!
      </h6>
      <div className="calender">
        <Calendar
          onClickDay={(e) => {
            setDate(e);
            console.log(e);
          }}
        />
      </div>
      {/* <div>
        <Dropdown>
          <div className="justify-content-md-center">
            <div className="chooseSport">
              <span className="chooseTitle">
                <h5>Choose team</h5>
              </span>
              <span className="chooseButton">
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-team"
                ></Dropdown.Toggle>
              </span>
            </div>
            <Dropdown.Menu>
              {teams.map((team) => {
                return (
                  <Dropdown.Item
                    key={team.id}
                    onClick={() => getGamesPerTeam(team.id)}
                  >
                    {team.name || team.nickname}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </div>
        </Dropdown>
      </div> */}
      <div className="gameList">{<GameList games={games} />}</div>
    </div>
  );
}
