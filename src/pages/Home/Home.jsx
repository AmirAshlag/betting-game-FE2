import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import GameList from "../../components/GameList/GameList";
import "./Home.css";

export default function Home() {
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
        <GameList />
      </div>
    </div>
  );
}
