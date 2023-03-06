import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import UserBetsData from "../../components/UserBetsData/UserBetsData";
import { UserContext2 } from "../../Context/UserContext/UserContext";
import "./MyBets.css";

export const MyBets = () => {
  const [user, setUser] = useState("");
  const [recentBets, setRecentBets] = useState("");
  const [futureBets, setFutureBets] = useState("");
  const [pendingBets, setPendingBets] = useState("");
  const { currentUser } = useContext(UserContext2);

  useEffect(() => {
    console.log("hey");
    try {
      const id = localStorage.getItem("id");
      console.log(id, currentUser._id);

      axios
        .get(
          `http://localhost:8080/users/getUser/${
            currentUser ? currentUser._id : id
          }`
        )
        .then((res) => {
          // console.log("user", res.data);
          setUser(res.data);
        });
      axios
        .get(
          `http://localhost:8080/bets/recent/${
            currentUser ? currentUser._id : id
          }`
        )
        .then((res) => {
          // console.log(res.data);
          setRecentBets(res.data);
        });
      axios
        .get(
          `http://localhost:8080/bets/future/${
            currentUser ? currentUser._id : id
          }`
        )
        .then((res) => {
          // console.log(res.data);
          setFutureBets(res.data);
        });
      axios
        .get(
          `http://localhost:8080/bets/futureTaken/${
            currentUser ? currentUser._id : id
          }`
        )
        .then((res) => {
          // console.log(res.data);
          setPendingBets(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="myBet-container">
      <div className="center-title">{user && <h1>{user.userName}</h1>}</div>
      <div className="center-title">{user && <h5>coins: {user.coins}</h5>}</div>
      <h4 className="data-title">Bets history</h4>
      <UserBetsData bets={recentBets} user={user} />
      <h4 className="data-title">Bets Pending</h4>
      <UserBetsData bets={pendingBets} user={user} />
      <h4 className="data-title">Bets uploaded</h4>
      <UserBetsData bets={futureBets} user={user} />

      {/* <div className="balance-sheets">
        <h6>Coins won vs lost</h6>
        <ProgressBar
          variant="success"
          now={70}
          striped
          animated
          style={{
            backgroundImage: "linear-gradient(to right, #8b0000, #dc3545)",
          }}
        />
        <h6>Bets won vs lost</h6>
        <ProgressBar
          variant="success"
          now={80}
          striped
          animated
          style={{
            backgroundImage: "linear-gradient(to right, #8b0000, #dc3545)",
          }}
        />
        <br></br>
        <h6>My Coins</h6>
        Total Coins: {user?.coins || 0}
      </div> */}
    </div>
  );
};
