import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./Home.css";

// const myData = [
//   {
//     text: "Atlanta",
//     value: "atl",
//   },
//   {
//     text: "Berlin",
//     value: "ber",
//   },
//   {
//     text: "Boston",
//     value: "bos",
//   },
// ];

{
  /* <Select data={myData} />; */
}
export default function Home() {
  return (
    <div className="homeContainer">
      <div className="title">
        <h1>Bet Game</h1>
        <h3>explanation</h3>
        <div className="chooseButton">
          <Dropdown>
            <div className="justify-content-md-center">
              <div className="chooseSport">
                <h5>Sport Category</h5>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Choose
                </Dropdown.Toggle>
              </div>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">NBA</Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  Champions League
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">Sport3</Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
