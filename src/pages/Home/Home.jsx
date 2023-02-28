import React, { useEffect, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import GameList from "../../components/GameList/GameList";
import "./Home.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import WeeklyCalendar from "../../components/WeeklyCalendar/WeeklyCalendar";

export default function Home() {
  const [date, setDate] = useState(false);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState("");
  let nbaTeams = [
    "All Teams",
    "Atlanta Hawks",
    "Boston Celtics",
    "Brooklyn Nets",
    "Charlotte Hornets",
    "Chicago Bulls",
    "Cleveland Cavaliers",
    "Dallas Mavericks",
    "Denver Nuggets",
    "Detroit Pistons",
    "Golden State Warriors",
    "Houston Rockets",
    "Indiana Pacers",
    "LA Clippers",
    "Los Angeles Lakers",
    "Memphis Grizzlies",
    "Miami Heat",
    "Milwaukee Bucks",
    "Minnesota Timberwolves",
    "New Orleans Pelicans",
    "New York Knicks",
    "Oklahoma City Thunder",
    "Orlando Magic",
    "Philadelphia 76ers",
    "Phoenix Suns",
    "Portland Trail Blazers",
    "Sacramento Kings",
    "San Antonio Spurs",
    "Toronto Raptors",
    "Utah Jazz",
    "Washington Wizards",
  ];

  useEffect(() => {
    fetch("http://localhost:8080/games/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
      });
  }, []);

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
        const games = data.response;

        const today = new Date();
        //////////////////////////////////////////////.  27 + 7 = 34
        const sevenDaysFromToday = new Date().setDate(today.getDate() + 7);
        const thisWeekGames = games.filter((game) => {
          const dateOfGame = new Date(game.date.start);
          return dateOfGame >= today && dateOfGame < sevenDaysFromToday;
        });
        setGames(thisWeekGames);
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
      <div className="calendar">
        <WeeklyCalendar
          onClickDay={(e) => {
            setDate(e);
          }}
        />
      </div>

      <div>
        <Dropdown>
          <div className="justify-content-md-center">
            <div className="chooseSport">
              <span className="chooseTitle">
                <h5>Choose Team</h5>
              </span>
              <span className="chooseButton">
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-team"
                ></Dropdown.Toggle>
              </span>
            </div>

            <Dropdown.Menu>
              {teams
                .filter((team) => nbaTeams.includes(team.name))
                .map((team) => {
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
