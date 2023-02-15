import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import "./GameCard.css";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function GameCard({ gameId }) {
  const [gameData, setGameData] = useState("");
  const [bet, setbBet] = useState(false);

   const location = useLocation();
   const pathname = location.pathname;
   const id = pathname.split("/")[2];
   

  useEffect(() => {
    axios.get(`http://localhost:8080/games/ById/${id}`).then((res) => {
      setGameData(res.data.response[0]);
    });
    console.log(id);
  }, []);

  useEffect(() => {
    console.log(gameData);
  }, [gameData]);

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>NBA: 2023-02-11</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body">
          {gameData && (
            <div className="games-container">
              <div className="team-data">
                <img
                  src={gameData.teams.home.logo}
                  alt="not available"
                  className="team-logo"
                />
                <div className="name-flex">
                  <div className="team-name">{gameData.teams.home.name}</div>
                </div>
                <div className="team-score">
                  {gameData.scores.home.points
                    ? gameData.scores.home.points
                    : 0}
                </div>
              </div>
              <div className="vs">VS</div>
              <div className="team-data">
                <img
                  src={gameData.teams.visitors.logo}
                  alt="not available"
                  className="team-logo"
                />
                <div className="name-flex">
                  <div className="team-name">
                    {gameData.teams.visitors.name}
                  </div>
                </div>
                <div className="team-score">
                  {gameData.scores.visitors.points
                    ? gameData.scores.visitors.points
                    : 0}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          {!bet && gameData && gameData.status.long == "Scheduled" && (
            <div>
              <Button
                variant="primary"
                onClick={() => {
                  setbBet(!bet);
                }}
              >
                Create bet
              </Button>
            </div>
          )}
        </Modal.Footer>
        {bet && (
          <motion.div layout className={bet ? "bet" : "bet-none"}>
            <motion.div className="bet-title">New bet</motion.div>
            <motion.div className="bet-container">
              <form>
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="select team"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="select plus minus"
                    />
                  </div>
                </div>
                <div className="top">
                  <div className="row">
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="select your bet amount"
                        min={10}
                        max={1000}
                        step={5}
                      />
                    </div>
                    <div className="col">
                      <input
                        min={0.1}
                        max={10}
                        step={0.1}
                        type="number"
                        className="form-control"
                        placeholder="bet ratio for oponnent"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
            <Button variant="primary" className="submit-bet">
              Upload bet
            </Button>
          </motion.div>
        )}
      </Modal.Dialog>
    </div>
  );
}

export default GameCard;
