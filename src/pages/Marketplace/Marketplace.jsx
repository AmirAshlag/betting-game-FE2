import React, { useEffect, useContext } from "react";
import BetCard from "../../components/BetCard/BetCard";
import "./Marketplace.css";
import { UserContext2 } from "../../Context/UserContext/UserContext";
import axios from "axios";
import { useState, useRef } from "react";
import { debounce } from "lodash";

const Marketplace = () => {
  const { currentUser } = useContext(UserContext2);
  const [bets, setBets] = useState([]);
  const [loader, setLoader] = useState(false);
  const startIndex = useRef(0);
  const endIndex = useRef(2);
  const id = useRef("");
  const betsList = useRef([]);

  const getBets = debounce(() => {
    setLoader(true);
    if (id.current) {
      // console.log(id.current);
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
  }, 200);


  const updateIndexes = debounce(() => {
    startIndex.current += 2;
    endIndex.current += 2;
    console.log(startIndex.current, endIndex.current);
    getBets();
  }, 200);

  useEffect(() => {
    id.current = localStorage.getItem("id");
    getBets();

    window.addEventListener("scroll", (e) => {
      // console.log("win",window.innerHeight);
      // console.log("top",e.target.documentElement.scrollTop);
      console.log("height", e.target.documentElement.scrollHeight);
      if (
        window.innerHeight + e.target.documentElement.scrollTop >=
        e.target.documentElement.scrollHeight
      ) {
        updateIndexes();
        console.log("at the bottom of the page");
      }
    });
  }, []);

  return (
    <div className="marketplace-body">
      <div className="bets-container">
        {bets.length &&
          bets.map((bet) => {
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
