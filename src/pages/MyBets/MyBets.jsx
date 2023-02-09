import React from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";

export const MyBets = () => {
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
        <ProgressBar variant="success" now={40} />
        <ProgressBar variant="danger" now={80} />
        <ProgressBar variant="info" now={1000} />
      </div>
    </div>
  );
};
