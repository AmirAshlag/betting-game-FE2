import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./BetModal.css";
import { useContext } from "react";
import { UserContext2 } from "../../Context/UserContext/UserContext";

function BetModal({ overUnder, ratio, team, amount, setShowModal, id }) {
  const [error, seterror] = useState(false);
  const { currentUser } = useContext(UserContext2);
  const [uploaded, setUploaded] = useState(false)

  useEffect(() => {
    console.log(currentUser)
    if (!team || !amount) {
      seterror(true);
    }
  }, []);

  function clickHandler(){
    const bet = {
      type: "game score",
      gameId: id,
      amount: amount,
      userOne: {
        id: currentUser._id,
        bet: {
          winner: team,
          overUnder: overUnder,
          ratio: ratio
        },
      },
    };
    axios.post("http://localhost:8080/bets", bet).then((res)=>{
        console.log(res)
        setUploaded(true)
    })
  }

  return (
    <div
      className="modal show modal-position"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Your bet</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {error && <div>please enter team and amount</div>}
          {!error && overUnder < 0 && (
            <div>
              If the {team} win or loses by less then {-overUnder} you will win{" "}
              {amount} and your opponent will lose {amount * ratio}
            </div>
          )}
          {!error && overUnder > 0 && (
            <div>
              If the {team} win by more then {overUnder} you will win {amount}{" "}
              and your opponent will lose {amount * ratio}
            </div>
          )}
          {!error && overUnder === 0 && (
            <div>
              If the {team} win you will win {amount} and your opponent will
              lose {amount * ratio}
            </div>
          )}
          {uploaded && <h5 className="bet-uploaded">Bet uploaded!</h5>}
        </Modal.Body>

        <Modal.Footer className="footer">
          {!uploaded && (
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
          )}
          {!uploaded &&
            !error &&(
              <Button variant="primary" onClick={clickHandler}>
                Upload
              </Button>
            )}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default BetModal;
