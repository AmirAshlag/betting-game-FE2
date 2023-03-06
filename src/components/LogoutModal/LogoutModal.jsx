import "./LogoutModal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext2 } from "../../Context/UserContext/UserContext";
import { useContext } from "react";

export default function LogOutModal({ setModal }) {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext2);

  function closeModal() {
    setModal(false);
  }

  function logOut() {
    axios
      .get("http://localhost:8080/users/logout", {
        withCredentials: true,
      })
      .then(() => {
        localStorage.clear();
        setModal(false);
        setCurrentUser("")
        navigate("/");
      });
  }
  return (
    <div className="logout-modal">
      <div className="logout-text">are you sure you want to log out?</div>
      <div className="logout-btn-container">
        <button className="logout-btn" onClick={logOut}>
          Yes
        </button>
        <button className="logout-btn" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
}
