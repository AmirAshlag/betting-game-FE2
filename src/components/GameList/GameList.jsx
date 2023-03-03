import "./GameList.css";
import { useNavigate } from "react-router-dom";

export default function GameList({ games, teamScheduele}) {
  const navigate = useNavigate();

  return (
    <div className="game-list">
      <h2 className={games.length ? "gamelist-headline" : "gamelist-headline2"}>
        {games.length && !teamScheduele ? `Game List` : ""}
        {games.length && teamScheduele ? `${teamScheduele} next games` : ""}
        {!games.length ? "No Games" : ""}
      </h2>
      <div className="games">
        {games &&
          games.map((game) => {
            return (
              <div
                key={game.id}
                className="game"
                onClick={() => {
                  navigate(`/game/${game.id}`);
                }}
              >
                <div>
                  {game.teams.home.name}
                  <img className="game-logo" src={game.teams.home.logo} />
                </div>
                <div>
                  {game.teams.visitors.name}
                  <img className="game-logo" src={game.teams.visitors.logo} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
