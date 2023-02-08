import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import { useState } from "react";

const LoggedOut = () => {
  const [showLogin, setShowLogin] = useState(true)
  return (
    <div>
      {showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <Signup setShowLogin={setShowLogin} />
      )}
    </div>
  );
};

export default LoggedOut;
