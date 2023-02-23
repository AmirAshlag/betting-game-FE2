import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import GameList from "../../components/GameList/GameList";
import "./Home.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

export default function Home() {
  const [date, setDate] = useState("");
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/games/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
      });
  }, []);

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/games/ByDate/${date}`).then((res) => {
  //     console.log(res.data.response);
  //     setGames(res.data.response);
  //   });
  // }, [date]);

  const getGamesPerTeam = (teamId) => {
    fetch(`http://localhost:8080/games/teams/${teamId}`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.response);
      });
  };

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

      <div>
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
      </div>

      <div className="gameList">{<GameList games={games} />}</div>
    </div>
  );
}
