import React, { useEffect, useContext } from "react";
import BetCard from "../../components/BetCard/BetCard";
import "./Marketplace.css";
import { UserContext2 } from "../../Context/UserContext/UserContext";
import axios from "axios";
import { useState, useRef } from "react";

const Marketplace = () => {
  const { currentUser } = useContext(UserContext2);
  const [bets, setBets] = useState([]);
  const [loader, setLoader] = useState(false);
  const startIndex = useRef(0);
  const endIndex = useRef(3);
  const id = useRef("");
  const betsList = useRef([]);

  function getBets() {
    console.log(currentUser);
    setLoader(true);
    if (id.current) {
      console.log(id.current);
      axios
        .get(
          `http://localhost:8080/bets/scroll/${id.current}/${endIndex.current}/${startIndex.current}`
        )
        .then((res) => {
          console.log(res.data);
          betsList.current = [...betsList.current, ...res.data];
          // setBets([...bets, ...res.data]);
          setBets(betsList.current);
          setLoader(false);
        });
    } else if (currentUser) {
      axios
        .get(
          `http://localhost:8080/bets/scroll/${currentUser._id}/${endIndex.current}/${startIndex.current}`
        )
        .then((res) => {
          console.log(res.data);
          betsList.current = [...betsList.current, ...res.data];
          // setBets([...bets, ...res.data]);
          setBets(betsList.current);
          setLoader(false);
        });
    }
  }

  // useEffect(() => {
  //   if (currentUser) {
  //     getBets();
  //   }
  // }, [currentUser]);

  useEffect(() => {
    id.current = localStorage.getItem("id");
    getBets();

    window.addEventListener("scroll", (e) => {
      // console.log("win",window.innerHeight);
      // console.log("top",e.target.documentElement.scrollTop);
      // console.log("height",e.target.documentElement.scrollHeight)
      if (
        window.innerHeight + e.target.documentElement.scrollTop >=
        e.target.documentElement.scrollHeight
      ) {
        startIndex.current += 3;
        endIndex.current += 3;
        console.log(startIndex.current, endIndex.current);
        getBets();
        console.log("at the bottom of the page");
      }
    });
  }, []);

  return (
    <div className="marketplace-body">
      <div className="bets-container">
        {bets.length &&
          bets.map((bet, index) => {
            return (
              <div key={bet._id}>
                <BetCard bet={bet} />
              </div>
            );
          })}
      </div>
      {loader && <span className="loader"></span>}
    </div>
  );
};

export default Marketplace;
