import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import "./BetCard.css";
import axios from "axios";
import { useContext } from "react";
import { UserContext2 } from "../../Context/UserContext/UserContext";
import { useNavigate } from "react-router-dom";

export default function BetCard({ bet }) {
  const [date, setDate] = useState("");
  const { currentUser } = useContext(UserContext2);
  const navigate = useNavigate()

  useEffect(() => {
    const isoDate = bet.game.date.start;
    const date = new Date(isoDate);
    const formattedDate = date.toISOString().split("T")[0];
    setDate(formattedDate);
  }, []);

  function takeBet() {
    axios
      .post("http://localhost:8080/bets/take", {
        bet: bet,
        userTwoId: currentUser._id,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/my-bets");
      });
  }

  return (
    <div>
      {date && (
        <Card style={{ width: "18rem" }} className="bet-card">
          <Card.Img
            variant="top-rigt"
            src={bet.game.teams.home.logo}
            className="img"
          />
          <span className="vs2">VS</span>
          <Card.Img
            variant="top-left"
            src={bet.game.teams.visitors.logo}
            className="img2"
          />
          <span className="home-name">{bet.game.teams.home.nickname}</span>
          <span className="visitors-name">
            {bet.game.teams.visitors.nickname}
          </span>
          <Card.Body>
            <Card.Title className="bet-title2">{date}</Card.Title>
            <Card.Text>
              {bet.userOneChoise.overUnder < 0 && (
                <span>
                  If the {bet.userOneChoise.winner} loses by more then{" "}
                  {-bet.userOneChoise.overUnder} you will win{" "}
                  {bet.amount * bet.userOneChoise.ratio} else you will lose{" "}
                  {bet.amount}
                </span>
              )}
              {bet.userOneChoise.overUnder > 0 && (
                <span>
                  If the {bet.userOneChoise.winner} win by less then{" "}
                  {bet.userOneChoise.overUnder} or loses you will win{" "}
                  {bet.amount * bet.userOneChoise.ratio} else you will lose{" "}
                  {bet.amount}
                </span>
              )}
              {bet.userOneChoise.overUnder === 0 && (
                <span>
                  If the {bet.userOneChoise.winner} loses you will win{" "}
                  {bet.amount * bet.userOneChoise.ratio} else you will lose{" "}
                  {bet.amount}
                </span>
              )}
            </Card.Text>
          </Card.Body>
          {/* <ListGroup className="list-group-flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup> */}
          <Card.Body>
            <Button onClick={takeBet}>Take bet</Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
