import { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext2 } from "../../Context/UserContext/UserContext";

const UserRoute = ({ children }) => {
  const { currentUser } = useContext(UserContext2);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/user/check", { withCredentials: true })
//       .then((res) => {
//         // console.log(res.data.token);
//         setCurrentToken(res.data.token);
//       });
//   }, []);

  return currentUser._id ? children : "";
};

export default UserRoute;
