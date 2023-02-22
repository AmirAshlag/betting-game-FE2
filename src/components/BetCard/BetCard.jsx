import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import "./BetCard.css";
import axios from "axios";

export default function BetCard({ bet }) {
  const [game, setGame] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    console.log(bet);
    axios.get(`http://localhost:8080/games/ById/${bet.gameId}`).then((res) => {
      console.log(res.data.response[0]);
      setGame(res.data.response[0]);
      //   console.log(res.data.response[0].date.start);

      const isoDate = res.data.response[0].date.start;
      const date = new Date(isoDate);
      const formattedDate = date.toISOString().split("T")[0];
      setDate(formattedDate);
    });
  }, []);

  return (
    <div>
      {game && (
        <Card style={{ width: "18rem" }} className="bet-card">
          <Card.Img
            variant="top-rigt"
            src={game.teams.home.logo}
            className="img"
          />
          <span className="vs2">VS</span>
          <Card.Img
            variant="top-left"
            src={game.teams.visitors.logo}
            className="img2"
          />
          <span className="home-name">{game.teams.home.nickname}</span>
          <span className="visitors-name">{game.teams.visitors.nickname}</span>
          <Card.Body>
            <br></br>
            <Card.Title className="bet-title2">{date}</Card.Title>
            <Card.Text>
              {/* Some quick example text to build on the card title and make up the
              bulk of the card's content. */}
              {bet.userOne.bet.overUnder < 0 && (
                <div>
                  If the {bet.userOne.bet.winner} loses by more less then{" "}
                  {-bet.userOne.bet.overUnder} you will win{" "}
                  {bet.amount * bet.userOne.bet.ratio} else you will
                  lose {bet.amount}
                </div>
              )}
              {bet.userOne.bet.overUnder > 0 && (
                <div>
                  If the {bet.userOne.bet.winner} win by less then{" "}
                  {bet.userOne.bet.overUnder} or loses you will win{" "}
                  {bet.amount * bet.userOne.bet.ratio} else you will
                  lose {bet.amount}
                </div>
              )}
              {bet.userOne.bet.overUnder === 0 && (
                <div>
                  If the {bet.userOne.bet.winner} loses you will win{" "}
                  {bet.amount * bet.userOne.bet.ratio} else you will
                  lose {bet.amount}
                </div>
              )}
            </Card.Text>
          </Card.Body>
          {/* <ListGroup className="list-group-flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup> */}
          <Card.Body>
            <Button>Take bet</Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

// {
//   "type": "game score",
// 	"gameId": 11872,
//   "amount": 30,
//   "userOne": {
//     "id": "63e0f36c49d892861762ae6b",
//     "bet": {
//       "winner": "detroit pistons",
// 			"overUnder": 9
//     }
//   }
// }
