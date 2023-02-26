import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserContext2 = createContext();

const UserContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    console.log(currentUser);
    if (Cookies.get("jwt")) {
      let user = Cookies.get("jwt").split("");
      user.shift();
      user.shift();
      const newUser = user.join("");
      console.log(JSON.parse(newUser));
      setCurrentUser(JSON.parse(newUser));
      localStorage.setItem("id", JSON.parse(newUser)._id);
    }
  }, []);

  // const getUser = async () => {
  //   fetch("http://localhost:8080/users/" + userId);
  // };

  return (
    <UserContext2.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext2.Provider>
  );
};

export default UserContext;
