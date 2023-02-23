import { useEffect, useState } from "react";
import GameCard from "../GameCard/GameCard";
import axios from "axios";
import "./GameList.css"
import { useNavigate } from "react-router-dom";

export default function GameList({ games }) {
  const navigate = useNavigate();

  return (
    <div className="game-list">
      <h2 className="gamelist-headline">
        {games.length ? "Game List" : "No Games"}
      </h2>
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
  );
}
