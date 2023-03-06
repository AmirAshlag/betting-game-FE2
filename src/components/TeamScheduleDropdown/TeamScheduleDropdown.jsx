import React from "react";
import { Dropdown } from "react-bootstrap";

function TeamScheduleDropdown({
  teams,
  getGamesByDate,
  getGamesPerTeam,
  setTeamSchduele,
}) {
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

  return (
    <Dropdown>
      <div className="justify-content-md-center">
        <div className="chooseSport">
          <span className="chooseTitle">
            <h5>Choose Team</h5>
          </span>
          <span className="chooseButton">
            <Dropdown.Toggle variant="primary" id="dropdown-team" />
          </span>
        </div>
        <Dropdown.Menu className="drop">
          {teams
            .filter((team) => nbaTeams.includes(team.name))
            .map((team) => (
              <Dropdown.Item
                key={team.id}
                onClick={() => {
                  if (team.name === "All Teams") {
                    getGamesByDate();
                    setTeamSchduele(false);
                  } else {
                    getGamesPerTeam(team.id);
                  }
                  setTeamSchduele(team.name);
                }}
              >
                {team.name || team.nickname}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </div>
    </Dropdown>
  );
}

export default TeamScheduleDropdown;
