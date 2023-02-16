import React, { useContext } from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export const MyBets = () => {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  return (
    <div className="myBet-container">
      <div className="title">
        <h1 className="center-title">My Bets</h1>
      </div>
      <ListGroup as="ol" numbered>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Game</div>
            Home Team - Guest Team
          </div>
          <Badge bg="success" pill>
            40
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Game</div>
            Home Team - Guest Team
          </div>
          <Badge bg="danger" pill>
            40
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Game</div>
            Home Team - Guest Team
          </div>
          <Badge bg="danger" pill>
            40
          </Badge>
        </ListGroup.Item>
      </ListGroup>
      <br />

      <div className="balance-sheets">
        <div className="charts">
          <h6>Wines Bets</h6>
          <ProgressBar variant="success" now={40} />
          <h6>Lose Bets</h6>
          <ProgressBar variant="danger" now={80} />
        </div>
        <br />
        <div className="my-coins">
          <h4>My Coins {user.coins}</h4>
        </div>
      </div>
    </div>
  );
};
