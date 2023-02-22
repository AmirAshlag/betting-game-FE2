import { useEffect, useContext } from "react";
import BetCard from "../../components/BetCard/BetCard";
import "./Marketplace.css";
import { UserContext2 } from "../../Context/UserContext/UserContext";
import axios from "axios";
import { useState } from "react";

const Marketplace = () => {
  const { currentUser } = useContext(UserContext2);
  const [bets, setBets] = useState("");

  useEffect(() => {
    if (currentUser) {
      // console.log("2", currentUser)
      axios
        .get(`http://localhost:8080/bets/allBets/${currentUser._id}`)
        .then((res) => {
          console.log(res.data);
          setBets(res.data);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    console.log(bets);
  }, [bets]);

  return (
    <div className="marketplace-body">
      <div className="bets-container">
        {bets &&
          bets.map((bet) => {
            return (
              <div key={bet._id}>
                <BetCard bet={bet} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Marketplace;
