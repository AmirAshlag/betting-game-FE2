import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext2 } from "../../Context/UserContext/UserContext";
import LogoutModal from "../LogoutModal/LogoutModal";
import './NavBar.css'

export default function NavBar() {
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const { currentUser } = useContext(UserContext2);
  const navigate = useNavigate();

  return (
    <Container className="mynav">
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          {location.pathname === "/" ? null : (
            <Link className="nav-link" to="/">
              <Navbar.Brand>Home</Navbar.Brand>
            </Link>
          )}
          {location.pathname === "/my-bets" ? null : (
            <Link className="myBets-link" to="/my-bets">
              <Navbar.Brand>My Bets</Navbar.Brand>
            </Link>
          )}

          {location.pathname === "/marketplace"? null : (
            <Link className="marketplace" to="/marketplace">
              <Navbar.Brand>Marketplace</Navbar.Brand>
            </Link>
          )}

          {currentUser ? (
            <Navbar.Brand
              onClick={() => {
                setModal(true);
              }}
            >
              Logout
            </Navbar.Brand>
          ) : (
            <Navbar.Brand
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Navbar.Brand>
          )}
        </Container>
        {modal && <LogoutModal setModal={setModal} />}
      </Navbar>
    </Container>
  );
}
