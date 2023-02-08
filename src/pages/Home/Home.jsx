import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function Home() {
  return (
    <div className="homeContainer">
      <div className="title">
        <h1>Bet Game</h1>
        <h3>explanation</h3>
        <div className="chooseButton">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sport Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">NBA</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Champions League</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Sport3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
