import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./GameCard.css";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { UserContext2 } from "../../Context/UserContext/UserContext";
import BetModal from "../BetModal/BetModal";
import ScoresTable from "../Table/table";

function GameCard() {
  const [gameData, setGameData] = useState("");
  const [bet, setbBet] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [team, setTeam] = useState(false);
  const [amount, setAmount] = useState(false);
  const [overUnder, setOverUnder] = useState(0);
  const [ratio, setRatio] = useState(1);
  const [date, setDate] = useState("");

  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.split("/")[2];

  useEffect(() => {
    axios.get(`http://localhost:8080/games/ById/${id}`).then((res) => {
      setGameData(res.data.response[0]);
      // console.log("gamedata", res.data.response[0]);
    });
    console.log(id);
  }, []);

  useEffect(() => {
    if (gameData) {
      const dateString = gameData.date.start;
      const date = new Date(dateString);

      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");

      const formattedDate = `${day}-${month}-${year}`;
      setDate(formattedDate);
      console.log(gameData);
    }
  }, [gameData]);

  return (
    <div className="gamecard-body">
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>NBA: {date && date}</Modal.Title>
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
                    <div className="team-name2">
                      {gameData.teams.home.nickname}
                    </div>
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
                      {gameData.teams.visitors.nickname}
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
          {gameData && gameData.status.long == "Finished" && (
            <ScoresTable gameData={gameData} />
          )}
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
          {!showModal && bet && (
            <motion.div layout className={bet ? "bet" : "bet-none"}>
              <motion.div className="bet-title">New bet</motion.div>
              <motion.div className="bet-container">
                <form>
                  <div className="row">
                    <div className="col">
                      <span className="description">select your team</span>
                      <select
                        className="select-team"
                        value={team}
                        onChange={(e) => {
                          setTeam(e.target.value);
                        }}
                      >
                        <option value={false}>select team</option>
                        <option value={gameData.teams.home.name}>
                          {gameData.teams.home.nickname}
                        </option>
                        <option value={gameData.teams.visitors.name}>
                          {gameData.teams.visitors.nickname}
                        </option>
                      </select>
                    </div>
                    <div className="col">
                      <span className="description">Over under (optional)</span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="select over under"
                        min={-50}
                        max={50}
                        step={1}
                        value={overUnder}
                        onChange={(e) => {
                          setOverUnder(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="top">
                    <div className="row">
                      <div className="col">
                        <span className="description">select bet amount</span>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="amount"
                          min={10}
                          max={1000}
                          step={5}
                          value={amount}
                          onChange={(e) => {
                            setAmount(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col">
                        <span className="description">
                          bet ratio (optional)
                        </span>
                        <input
                          min={0.1}
                          max={10}
                          step={0.1}
                          type="number"
                          className="form-control"
                          placeholder="bet ratio"
                          value={ratio}
                          onChange={(e) => {
                            if (e.target.value <= 0) {
                              setRatio(1);
                            } else {
                              setRatio(e.target.value);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </motion.div>
              <Button
                variant="primary"
                className="submit-bet"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Upload bet
              </Button>
            </motion.div>
          )}
        </Modal.Dialog>
        {showModal && (
          <BetModal
            className="bet-modal"
            ratio={ratio}
            amount={amount}
            team={team}
            overUnder={overUnder}
            setShowModal={setShowModal}
            gameData={gameData}
          />
        )}
      </div>
    </div>
  );
}

export default GameCard;
