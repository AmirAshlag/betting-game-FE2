import React, { useState } from "react";
import { domain } from "../constants";

const defaultState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthContext = React.createContext(defaultState);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const coinsByUserId = async (userId) => {
    const response = await fetch(`${domain}/coins/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }

    setUser(data);
    setIsLoggedIn(true);
  };
  const value = {
    isLoggedIn,
    user,
    coinsByUserId,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return React.useContext(AuthContext);
};
