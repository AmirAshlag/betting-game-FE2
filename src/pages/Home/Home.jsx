import React, { useEffect, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import GameList from "../../components/GameList/GameList";
import "./Home.css";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import WeeklyCalendar from "../../components/WeeklyCalendar/WeeklyCalendar";
import TeamScheduleDropdown from "../../components/TeamScheduleDropdown/TeamScheduleDropdown";

export default function Home() {
  const [date, setDate] = useState(false);
  const [teamScheduele, setTeamSchduele] = useState(false);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/games/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams([{ name: "All Teams", id: "hey" }, ...data]);
      });
  }, []);

  function getGamesByDate() {
    axios.get(`http://localhost:8080/games/ByDate/${date}`).then((res) => {
      console.log(res.data.response);
      setGames(res.data.response);
    });
  }

  useEffect(() => {
    getGamesByDate();
  }, [date]);

  const getGamesPerTeam = (teamId) => {
    fetch(`http://localhost:8080/games/teams/${teamId}`)
      .then((res) => res.json())
      .then((data) => {
        const games = data.response;
        const today = new Date();
        const sevenDaysFromToday = new Date().setDate(today.getDate() + 7);
        const thisWeekGames = games.filter((game) => {
          const dateOfGame = new Date(game.date.start);
          return dateOfGame >= today && dateOfGame < sevenDaysFromToday;
        });
        setGames(thisWeekGames);
      });
  };
  return (
    <div>
      <h1 className="home-title">Betting Game</h1>
      <div className="welcomeBody">
        <h6>choose a game and start betting with your friends!</h6>
      </div>
      <div className="calendar">
        <WeeklyCalendar
          onClickDay={(e) => {
            setDate(e);
            setTeamSchduele(false);
          }}
        />
      </div>
      <div className="drop-container">
        <TeamScheduleDropdown
          teams={teams}
          getGamesByDate={getGamesByDate}
          getGamesPerTeam={getGamesPerTeam}
          setTeamSchduele={setTeamSchduele}
        />
      </div>
      <div className="gameList">
        {<GameList games={games} teamScheduele={teamScheduele} date={date} />}
      </div>
    </div>
  );
}
