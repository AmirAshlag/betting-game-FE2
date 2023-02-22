import { useEffect, useContext } from "react";
import BetCard from "../../components/BetCard/BetCard";
import "./Marketplace.css";
import { UserContext2 } from "../../Context/UserContext/UserContext";
import axios from "axios";
import { useState } from "react";

const Marketplace = () => {
  const { currentUser } = useContext(UserContext2);
  const [bets, setBets] = useState('')

  useEffect(() => {
    console.log(currentUser)
    if (currentUser) {
      axios
        .get(`http://localhost:8080/bets/allBets/${currentUser._id}`)
        .then((res) => {
          console.log(res.data);
          setBets(res.data)
        });
    }
  }, []);

  useEffect(()=>{
    console.log(bets)
  },[bets])

  return (
    <div>
      <BetCard />
    </div>
  );
};

export default Marketplace;
