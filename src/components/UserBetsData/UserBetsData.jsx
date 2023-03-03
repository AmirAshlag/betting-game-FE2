import React from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import './UserBetsData.css'

const UserBetsData = ({ bets, user }) => {
  return (
    <ListGroup as="ol" numbered>
      {bets &&
        bets.map((bet) => {
          return (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
              key={bet._id}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  {new Date(bet.game.date.start).toISOString().slice(0, 10)}
                </div>
                {bet.game.teams.home.name} - {bet.game.teams.visitors.name}
              </div>
              <Badge bg={bet.winner == user._id ? "success" : "danger"} pill>
                {bet.winner == user._id ? (
                  user._id == bet.userOne ? (
                    <div className="bet-result">{bet.amount}</div>
                  ) : (
                    <div className="bet-result">
                      {bet.amount * bet.userOneChoise.ratio}
                    </div>
                  )
                ) : user._id == bet.userOne ? (
                  <div className="bet-result">{-bet.amount}</div>
                ) : (
                  <div className="bet-result">
                    {-bet.amount * bet.userOneChoise.ratio}
                  </div>
                )}
              </Badge>
            </ListGroup.Item>
          );
        })}
    </ListGroup>
  );
};

export default UserBetsData;
