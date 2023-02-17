import { createContext, useEffect } from "react";

useEffect(()=>{
    console.log(JSON.parse(localStorage.getItem("Jw")));
}
,[])
const UserContext = () => {
  const UserContext = createContext();

  return <UserContext.Provider value={1}></UserContext.Provider>;
};

export default UserContext;
